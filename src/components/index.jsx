import React from 'react';
import ReactDOM from 'react-dom';
import { remote } from 'electron';

import { AppContainer } from 'react-hot-loader';

const cookies = JSON.parse(localStorage.getItem('cookies') || '[]');

cookies.forEach((theCookie) => {
  const cookie = Object.assign({}, theCookie);
  delete cookie.session;
  delete cookie.hostOnly;
  cookie.url = 'https://my-timetable.monash.edu';
  cookie.expirationDate = Date.now();
  remote.session.defaultSession.cookies.set(cookie, () => {});
});

const render = () => {
  const App = require('./App').default; // eslint-disable-line

  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>
  , document.querySelector('#app'));
};

render();

if (module.hot) {
  module.hot.accept(render);
}
