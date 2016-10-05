import superb from 'superb';
import { prompt } from 'inquirer';
import { sync as mkdirpSync } from 'mkdirp';
import moment from 'moment';
import { safeDump as dumpYaml } from 'js-yaml';
import { slugify } from 'underscore.string';
import { writeFileSync } from 'fs';
import open from 'open';
import capitalize from 'lodash.capitalize';

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter a title      : ',
    default: `My Next ${capitalize(superb())} Post`
  },
  {
    type: 'input',
    name: 'path',
    message: 'Set a path         : ',
    default: answers => slugify(answers.title)
  },
  {
    type: 'input',
    name: 'description',
    message: 'Describe this post : ',
    default: answers => `A ${superb()} description for ${answers.title}`
  }
];

prompt(questions).then((answers) => {
  const dir = `./pages/blog/${answers.path}`;
  mkdirpSync(dir);
  const fm = {
    title: answers.title,
    date: moment().format('MM/DD/YYYY'),
    description: answers.description,
    draft: true
  };
  const fileString = `---\n${dumpYaml(fm)}---\n`;
  writeFileSync(`${dir}/index.md`, fileString, {
    encoding: 'utf-8'
  });
  console.log(`\n${dir}`); // eslint-disable-line
  open(`${dir}/index.md`);
});
