/* eslint-disable */
import generateFeed from './src/scripts/feed.js';

export function modifyWebpackConfig(config, env) {
  if (env === 'build-javascript') {
    config.merge({
      devtool: 'hidden-source-map'
    });
  }
  return config;
}

export function postBuild(pages, callback) {
  generateFeed(pages);
  callback();
}
