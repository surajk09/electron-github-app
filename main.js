const { app, BrowserWindow ,ipcMain} = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

log.transports.file.file = `${app.getPath('userData')}/app.log`;
log.transports.file.format = '{h}:{i}:{s} {text}';
log.transports.file.level = 'info';  // Set log level (error, warn, info, verbose, debug, silly)
log.info(`path --> ${app.getPath('userData')}`)

log.info('App started');
// Set up logger
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

// Configure auto updater
autoUpdater.autoDownload = true;
autoUpdater.allowDowngrade = false;

// Check for updates
app.on('ready', () => {
  log.info('ready1');
  autoUpdater.checkForUpdatesAndNotify();
  log.info('ready2');
});

// Listen for update downloaded
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

// Listen for update error
autoUpdater.on('error', (err) => {
  log.error('AutoUpdater error:', err.message);
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
  log.info('whenReady1');
    createWindow();
    log.info('whenReady2');
    autoUpdater.checkForUpdatesAndNotify();
    log.info('whenReady3');
  });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  log.info('activate1');
  if (BrowserWindow.getAllWindows().length === 0) {
    log.info('activate2');
    createWindow();
    log.info('activate3');
  }
  log.info('activate4');
});
