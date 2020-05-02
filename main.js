const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

require('dotenv').config();
if (process.env.PACKAGE === 'false') {
  require('electron-reload')(__dirname);
}


let win = null;

app.on('ready', function () {

  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    resizable: false,
    center: true,
    autoHideMenuBar: true,
    fullscreen: true
  });

  if (process.env.PACKAGE === 'false') {
    win.loadURL(process.env.HOST);
    win.webContents.openDevTools();
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, '../frontend/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.on('closed', function () {
    win = null;
  });

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});