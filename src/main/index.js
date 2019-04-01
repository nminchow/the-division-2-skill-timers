import { app, BrowserWindow, globalShortcut, ipcMain  } from 'electron' // eslint-disable-line

const ioHook = require('iohook');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// app.on('ready', () => {
//   console.log('called');
//   // Register a 'CommandOrControl+X' shortcut listener.
//   const ret = globalShortcut.register('CommandOrControl+X', () => {
//     console.log('CommandOrControl+X is pressed');
//   });

//   if (!ret) {
//     console.log('registration failed');
//   }

//   // Check whether a shortcut is registered.
//   console.log(globalShortcut.isRegistered('CommandOrControl+X'));
// });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// shortcut registration
let started = false;
ipcMain.on('start-listener', (event) => {
  if (started) return;
  started = true;

  // note that ihook seems to emit an event called 'keypress' to ipcRender, so we use our
  // own as not to collide.
  // there is no reason we couldn't just rely on the existing event, but its
  // POSSIBLE that iohook could change their internals, and it would be a
  // super tricky bug.
  ioHook.on('keydown', (keypress) => {
    event.sender.send('keydownEmitted', keypress);
  });

  ioHook.on('keyup', (keypress) => {
    event.sender.send('keyupEmitted', keypress);
  });
});

app.on('before-quit', () => {
  ioHook.unload();
  ioHook.stop();
});


app.on('ready', () => {
  ioHook.start();
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
