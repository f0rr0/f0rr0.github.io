import { config } from 'config'; // eslint-disable-line
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import Helmet from 'react-helmet';
import QuantfiedSelf from '../src/components/QuantifiedSelf';
import { getBlogPosts } from '../src/utils/blog-helpers';
import '../src/css/lists.css';

const Anchor = props =>
  <a target='_blank' rel='noopener noreferrer' href={props.href}>
    {props.title}
  </a>;

Anchor.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string
};

export default function BlogIndex(props) {
  const latestBlogPost = getBlogPosts(props.route).shift();
  const { data: { title, date }, path } = latestBlogPost;
  const fromNow = moment(date, 'MM/DD/YYYY').fromNow();
  const docTitle = `${config.blogTitle} by ${config.authorName}`;

  return (
    <section className='content'>
      <Helmet
        title={docTitle}
        meta={[
          { name: 'description', content: config.description },
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: docTitle },
          { property: 'og:description', content: config.description },
          { name: 'twitter:description', content: config.description },
          { name: 'twitter:title', content: docTitle }
        ]}
      />
      <p>Hello, my name is <Link to='/about/'>Siddharth Jain</Link>.</p>
      <p>
        I am a web developer-designer living in <del>Los Angeles</del>
        &nbsp;New Delhi, currently contracting independently for <Anchor href='//bridg.com' title='Bridg' />.
      </p>
      <p>
        I use <Link to='/about/#about-yuppies'>this space</Link> primarily for <Link to='/blog/'>writing</Link> and <Link to='/hire/'>reaching out</Link> to clients. The last piece I wrote was&nbsp;
        <i><Link to={path}>&lsquo;{title}&rsquo;</Link></i> {fromNow}.
      </p>
      <p>
        I am a huge proponent of <Anchor href='//en.wikipedia.org/wiki/Lifelog' title='lifelogging' /> and have been collecting actionable data on myself since early 2014. Here are the latest metrics from <Anchor href='//rescuetime.com' title='Rescuetime' /> and <Anchor href='http://last.fm/user/sidjain26' title='Last.fm' />:
      </p>
      <QuantfiedSelf />
    </section>
  );
}

BlogIndex.propTypes = {
  route: PropTypes.object
};
