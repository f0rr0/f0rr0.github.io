import React, { Component, PropTypes } from 'react';
import FlipMove from 'react-flip-move';

export default class StaggerFlipMove extends Component {
  componentDidMount() {
    this.fadeIn('.activity', 200);
    this.fadeIn('.track', 200);
  }

  // Fade in immediately if alredy mounted
  componentDidUpdate() {
    this.fadeIn('.activity, .track');
    // this.fadeIn('.track');
  }

  fadeIn(selector, staggerDelay = 0) {
    [...document.querySelectorAll(selector)].forEach((child, i) => { // eslint-disable-line
      setTimeout(() => {
        child.style.opacity = 1; // eslint-disable-line
      }, staggerDelay + (staggerDelay * i));
    });
  }

  render() {
    return (
      <FlipMove
        enterAnimation='fade'
        leaveAnimation='fade'
        typeName='ul'
        easing='ease-in-out'
        duration='700'
        staggerDurationBy='100'
        staggerDelayBy='40'
      >
        {this.props.children}
      </FlipMove>
    );
  }
}

StaggerFlipMove.propTypes = {
  children: PropTypes.array
};
