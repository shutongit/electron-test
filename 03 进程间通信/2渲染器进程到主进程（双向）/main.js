const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require("fs")



async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] })
  console.log("filePaths: ", filePaths);
  if (canceled) {
    return
  } else {
    readFolderFiles(filePaths[0])
    return filePaths[0]
  }
}
/** 读取文件夹内的文件 */
function readFolderFiles(paths) {
  fs.readdir(paths, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      console.log(files);
      files.forEach((x) => {
        console.log('有' + x + '这个文件');
      })
    }
  })
}
function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  ipcMain.handle('dialog:openFile', handleFileOpen)
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})