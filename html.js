import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import prune from 'underscore.string/prune';
import { config } from 'config'; // eslint-disable-line

const BUILD_TIME = new Date().getTime();

export default function HTML(props) {
  const { body } = props;
  const title = DocumentTitle.rewind();

  let description;
  if (props.page && props.page.data) {
    description = prune(props.page.data.body.replace(/<[^>]*>/g, ''), 200);
  } else {
    description = config.description;
  }
  const path = props.location ? props.location.pathname : null;


  let css;
  if (process.env.NODE_ENV === 'production') {
    css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />; // eslint-disable-line
  }

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <title>{title}</title>

        <meta name='robots' content='index, follow' />
        <meta name='author' content='Siddharth Jain' />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@f0rr0' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />

        <meta property='og:title' content={title} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={`https://yuppi.es${path}`} />
        <meta property='og:description' content={description} />
        <meta property='og:site_name' content='Yuppies' />
        <meta property='article:author' content='https://facebook.com/f0rr0' />
        <meta property='og:image' content='https://yuppi.es/avatar.jpeg' />

        <link href='https://fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' />
        {css}
      </head>
      <body className='container'>
        <div id='react-mount' dangerouslySetInnerHTML={{ __html: body }} />
        <script async src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
        <script dangerouslySetInnerHTML={{ __html: '' }} />
      </body>
    </html>
  );
}

HTML.propTypes = {
  body: PropTypes.string,
  page: PropTypes.shape({
    data: PropTypes.object
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};
