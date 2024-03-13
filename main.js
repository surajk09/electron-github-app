const { app, BrowserWindow ,ipcMain} = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

// Set up logger
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

// Configure auto updater
autoUpdater.autoDownload = true;
autoUpdater.allowDowngrade = false;


  // Listen for update downloaded
// Listen for update downloaded
autoUpdater.on('update-downloaded', () => {
  // Send update status to renderer process
  mainWindow.webContents.send('update-available', 'Update downloaded. Ready to install.');
});

// Listen for update error
autoUpdater.on('error', (err) => {
  // Send update status to renderer process
  mainWindow.webContents.send('update-error', `Update error: ${err.message}`);
});

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


ipcMain.on('check-updates', (event, arg) => {
  // Check for updates when requested from renderer process
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('ready', createWindow);