/* eslint-disable */

export function modifyWebpackConfig(config, env) {
  if (env === 'build-javascript') {
    config.merge({
      devtool: 'hidden-source-map'
    });
  }
  return config;
}
