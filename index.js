const {
  app,
  BrowserWindow,
} = require('electron');
const path = require('path');
const url = require('url');
const DEV = require('electron-is-dev');

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL(DEV ? 'http://localhost:8080/' : url.format({
    pathname: path.join(__dirname, 'app', 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
