const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');



function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
  });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
// Quit the app when the update is downloaded and ready to install
autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
  });