const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

// Set up logger
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

// Configure auto updater
autoUpdater.autoDownload = true;
autoUpdater.allowDowngrade = false;

// Check for updates
app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify();
});


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

  // Listen for update downloaded
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

// Listen for update error
autoUpdater.on('error', (err) => {
  log.error('AutoUpdater error:', err.message);
});