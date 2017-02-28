import React, { PureComponent } from 'react';
import path from 'path';
import WebView from 'react-electron-webview';
import { ipcRenderer, remote } from 'electron';

import Calendar from './Calendar';

export default class App extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      allocateData: null,
    };
  }

  componentDidMount() {
    ipcRenderer.once('allocateData', (event, allocateData) => {
      this.setState({
        allocateData,
      });
      remote.session.defaultSession.cookies.get({
        domain: 'my-timetable.monash.edu',
        secure: true,
        session: true,
      }, (err, cookies) => {
        localStorage.setItem('cookies', JSON.stringify(cookies));
      });
    });
  }

  render() {
    if (!this.state.allocateData) {
      return (
        <WebView src="https://my-timetable.monash.edu/odd/student" preload={path.resolve(__dirname, '../preload/allocate')} nodeIntegration="off" />
      );
    }
    return (
      <Calendar allocateData={this.state.allocateData} />
    );
  }
}
