import React, { Component, PropTypes } from 'react';
import Rebase from 're-base';
import Track from './Track';
import Category from './Category';
import StaggerFlipMove from './StaggerFlipMove';
import '../css/lists.css';

const DoubleBounce = () =>
  <div className={'double-bounce'}>
    <div className='double-bounce1' />
    <div className='double-bounce2' />
  </div>;

const LoadingIndicator = ({ msg }) =>
  <div className='loading'>
    <DoubleBounce />{msg}
  </div>;

LoadingIndicator.defaultProps = {
  msg: 'Loading'
};

LoadingIndicator.propTypes = {
  msg: PropTypes.string
};

export default class QuantfiedSelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      tracks: null,
      categories: null,
      loading: true
    };
    this.refsArr = [];
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    if (!this.state.loading) {
      this.fadeIn('.list-intro', 100);
    }
  }

  componentWillUnmount() {
    this.refsArr.forEach((ref) => {
      if (ref) {
        this.base.removeBinding(ref);
      }
    });
  }

  getTrackKey(track) {
    return `${track.title}${track.artist}`.replace(/ /g, '').toLowerCase();
  }

  fadeIn(selector, staggerDelay = 0) {
    document.querySelectorAll(selector).forEach((child, i) => { // eslint-disable-line
      setTimeout(() => {
        child.style.opacity = 1; // eslint-disable-line
      }, staggerDelay + (staggerDelay * i));
    });
  }

  init() {
    this.base = Rebase.createClass({
      apiKey: 'AIzaSyCTV2O9hthOdcC6uxTgbtFVWu7HxiYH_0g',
      authDomain: 'meapi.firebaseapp.com',
      databaseURL: 'https://meapi.firebaseio.com',
      storageBucket: 'project-5128764592720470892.appspot.com'
    });

    this.dateRef = this.base.listenTo('lastDate', {
      context: this,
      then: (date) => {
        this.setState({ date });

        this.tracksRef = this.base.listenTo(`${date.toString()}/recentTracks`, {
          context: this,
          asArray: true,
          queries: {
            limitToFirst: 5
          },
          then: (allTracks) => {
            const tracks = allTracks.map((track) => {
              const key = this.getTrackKey(track);
              return {
                ...track,
                key
              };
            });
            this.setState({ tracks });
            if (this.state.categories) {
              this.setState({ loading: false });
            }
          }
        });
        this.refsArr.push(this.tracksRef);
        this.catsRef = this.base.listenTo(`${date.toString()}/categories`, {
          context: this,
          asArray: true,
          queries: {
            limitToFirst: 6 // +1 for Uncategorized
          },
          then: (allCategories) => {
            const categories = allCategories.filter(({ category }) => category !== 'Uncategorized').splice(0, 5);
            this.setState({ categories });
            if (this.state.tracks) {
              this.setState({ loading: false });
            }
          }
        });
        this.refsArr.push(this.catsRef);
      }
    });
    this.refsArr.push(this.dateRef);
  }

  render() {
    const { date, tracks, categories, loading } = this.state;
    if (!date || loading) {
      return <LoadingIndicator msg='Crunching latest data...' />;
    }
    const tunes = tracks.map((track) => {
      if (track) {
        return <Track {...track} />;
      }
      return null;
    });
    const cats = categories.map((category) => {
      if (category) {
        return <Category key={category.category} {...category} />;
      }
      return null;
    });
    return (
      <article className='lists'>

        { cats.length > 0 ?
          <div className='activity-list'>
            <div style={{ opacity: 0 }} className='list-intro'>
              &#10095; sort -t'time' -k2 ~/.todays_tasks
            </div>
            <StaggerFlipMove>
              {cats}
            </StaggerFlipMove>
          </div>
        : null }

        { tunes.length > 0 ?
          <div className='track-list'>
            <div style={{ opacity: 0 }} className='list-intro'>
              &#10095; ls -1ltu ~/recent_music_history
            </div>
            <StaggerFlipMove>{tunes}</StaggerFlipMove>
          </div>
        : null }

      </article>
    );
  }
}
