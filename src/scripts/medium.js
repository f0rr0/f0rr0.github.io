import { MediumClient as Medium } from 'medium-sdk';
import { processFile as parseToJSON } from 'md-yaml-json';
import { load as parseHtml } from 'cheerio';
import { extname } from 'path';
import recursiveReaddir from 'recursive-readdir';
import { prompt } from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import dotenv from 'dotenv';
import moment from 'moment';
import sortBy from 'lodash.sortby';

const scanSpinner = ora({
  color: 'green',
  text: chalk.green('Parsing posts')
});
scanSpinner.start();

// Get token from .env file and instantiate client
dotenv.config({ path: `${__dirname}/.env` });
const { TOKEN, DOMAIN, TITLE } = process.env;
if (!TOKEN || !DOMAIN || !TITLE) {
  scanSpinner.message = chalk.red('Error: Auth token, domain name and title must be set in .env file!');
  scanSpinner.fail();
  process.exit();
}
const client = new Medium({
  clientId: TOKEN,
  clientSecret: TOKEN
});
client.setAccessToken(TOKEN);

// Get directory specified in prompt and recursively scan for .md files
const postsDir = process.argv.slice(1).pop();
const ignoreFunc = (file, stats) => !stats.isDirectory() && !(extname(file) === '.md');
recursiveReaddir(postsDir, [ignoreFunc], (err, files) => {
  if (err) {
    scanSpinner.text = chalk.red(err);
    scanSpinner.fail();
    process.exit();
  }

  const posts = files.map((file) => {
    const { meta: { title, draft, path, mtime }, html } = parseToJSON(file);

    // md-yaml-json sets path for us. Use it to get relative path from /pages
    const relativePath = path.split('pages/').pop().split('index.md').shift();

    // Replace relative image links to absolute
    const $ = parseHtml(html, {
      recognizeSelfClosing: true
    });
    $('img').each((index, elem) => {
      const src = $(elem).attr('src').split('./').pop();
      $(elem).attr('src', `${DOMAIN}/${relativePath}${src}`);
    });

    return {
      title,
      draft,
      html: $.html(),
      path: relativePath,
      mtime: moment(mtime).valueOf()
    };
  });

  scanSpinner.succeed();

  // Prepare prompt choices from parsed files, disable drafts, sort by mtime
  const choices = sortBy(posts, ({ mtime }) => mtime)
  .reverse()
  .map(({ title: name, draft }) => ({
    name,
    disabled: draft ? 'Draft' : false
  }));
  const question = [
    {
      type: 'checkbox',
      message: 'Select posts to publish:',
      name: 'selected',
      choices,
      validate: answer => answer.length > 0
    }
  ];

  prompt(question).then(({ selected }) => {
    // Get parsed files for selected choices
    const postsToPublish = posts
    .filter(({ title }) => selected.includes(title));

    const authSpinner = ora({
      color: 'green',
      text: chalk.green('Authenticating with Medium')
    });
    authSpinner.start();

    // Authenticate user with Medium
    client.getUser((err, user) => {
      if (err) {
        authSpinner.text = chalk.red(err);
        authSpinner.fail();
        process.exit();
      }
      authSpinner.succeed();

      console.log(chalk.bold('- Publishing posts for ' + chalk.green(user.username))); // eslint-disable-line

      postsToPublish.forEach((post) => {
        const { title, html, path } = post;

        // Add title and cross-post ref. Medium requires title be set in body
        const content = `<h1>${title}</h1>${html}<strong><em>Cross-posted from <a href='${DOMAIN}/${path}'>${TITLE}</a></em></strong>`;

        const uploadSpinner = ora({
          color: 'green',
          text: chalk.green(title)
        });
        uploadSpinner.start();

        // Create and upload post as draft
        client.createPost({
          userId: user.id,
          title,
          content,
          contentFormat: 'html',
          publishStatus: 'draft'
        }, (err, res) => {
          if (err) {
            uploadSpinner.text = chalk.red(`${title} - ${err}`);
            uploadSpinner.fail();
          } else {
            uploadSpinner.text = chalk.green(`${title} published at ${res.url}`);
            uploadSpinner.succeed();
          }
        });
      });
    });
  });
});
