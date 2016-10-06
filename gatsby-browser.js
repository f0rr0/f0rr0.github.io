/* eslint-disable */

export function onRouteUpdate(location) {
  if (location.hash) {
    setTimeout(() => {
      document.querySelector(`${location.hash}`).scrollIntoView();
    }, 0);
  }
  if (typeof ga !== 'undefined') {
    ga('send', 'pageview', {
      page: location.pathname
    });
  }
};
