import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import kebabCase from 'lodash.kebabcase';

const Timestamp = props =>
  <time>{props.time}</time>;

Timestamp.propTypes = {
  time: PropTypes.string
};

const Activities = (props) => {
  const activities = props.activities.map(({ activity }) => activity).join(', ');
  return (
    <div title={activities} className='activities ellipsis'>
      {activities}
    </div>
  );
};

Activities.propTypes = {
  activities: PropTypes.array
};

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { activities, category, time } = this.props;
    const thumb = {
      backgroundImage: `url(${prefixLink(`/icons/${kebabCase(category)}`)}.svg)`
    };
    return (
      <div style={{ opacity: 0 }} className='activity' key={category}>
        <div className='thumb icon' style={thumb} />
        <div className='info'>
          <div title={category} className='category ellipsis'>{category}</div>
          <Timestamp className='timestamp ellipsis' time={time} />
          <Activities activities={activities} />
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  activities: PropTypes.array,
  category: PropTypes.string,
  time: PropTypes.string,
};
