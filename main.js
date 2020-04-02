const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

require('dotenv').config();
if (process.env.PACKAGE === 'false'){
  require('electron-reload')(__dirname);
}


let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1024, height: 768});

  // Specify entry point
  if (process.env.PACKAGE === 'true'){
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'arcomage/dist/arcomage/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    win.loadURL(process.env.HOST);
    //win.webContents.openDevTools();
  }

  // Remove window once app is closed
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