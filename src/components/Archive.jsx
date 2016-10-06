import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import moment from 'moment';
import { getBlogPosts } from '../utils/blog-helpers';

const generatePostsTable = ({ route }) => {
  const rows = [];
  getBlogPosts(route).forEach(({ data, path }) => {
    const { title, date } = data;
    rows.push(
      <tr key={path}>
        <td><time>{moment(date, 'MM/DD/YYYY').format('YYYY-MM-DD')}</time></td>
        <td><Link to={prefixLink(path)}>{title}</Link></td>
      </tr>
    );
  });
  return rows;
};

export default function Archive(props) {
  const rows = generatePostsTable(props);
  return <table className='post-list'><tbody>{rows}</tbody></table>;
}

Archive.propTypes = {
  posts: React.PropTypes.object
};
