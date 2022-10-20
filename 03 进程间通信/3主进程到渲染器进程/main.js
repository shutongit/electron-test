const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron")
const fs = require("fs")
const path = require("path")

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })


    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    click: () => mainWindow.webContents.send('update-counter', 1),
                    label: 'Increment',
                },
                {
                    click: () => mainWindow.webContents.send('update-counter', -1),
                    label: 'Decrement',
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu)
    mainWindow.loadFile('index.html')
    mainWindow.webContents.openDevTools()
}


app.whenReady().then(() => {
    ipcMain.on('counter-value', (_event, value) => {
        // console.log(value);
        // const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] })

        dialog.showOpenDialog({ title: '选择文件' }).then((data) => {
            // console.log("data:" + data.filePaths[0]);

            fs.readFile(data.filePaths[0], function (err, f) {
                if (err) console.error("读取文件错误");
                console.log("fileData: ", f);
            })
        })
    })


    createWindow()
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})