import { ipcMain } from 'electron';
import { enableLiveReload } from 'electron-compile';
import menubar from 'menubar';

const mb = menubar({
  width: 800,
  height: 710,
  minHeight: 710,
  maxHeight: 710,
  frame: false,
  index: `file://${__dirname}/index.html`,
  preloadWindow: true,
  tooltip: 'Timetable',
  dir: __dirname,
});

let mainWindow;

enableLiveReload({ strategy: 'react-hmr' });

const createWindow = () => {
  mainWindow = mb.window;

  try {
    require('electron-devtools-installer').default(require('electron-devtools-installer').REACT_DEVELOPER_TOOLS) // eslint-disable-line
      .catch(err => console.error(err));
  } catch (err) {
    console.error(err);
  }

  ipcMain.on('allocateData', (event, data) => {
    mainWindow.webContents.send('allocateData', data);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

mb.on('ready', createWindow);
