const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
var MainWindow;
function event_create()
{
    MainWindow = new BrowserWindow(
        {
            width: 800,
            height: 600,
            title: "Markify",
            show: false
         });
    MainWindow.loadURL(url.format(
        {
            pathname: path.join(__dirname, '/index.html'),
            protocol: 'file',
            slashes: true
         }));
    MainWindow.on('closed', event_destroy);
    MainWindow.on('ready-to-show', event_load);
}
function event_load()
{
    MainWindow.show();
}
function event_activate()
{
    if (MainWindow === null)
    {
        event_create();
    }
}
function event_close()
{
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
}
function event_destroy()
{
    MainWindow = null;
}
function main()
{
    app.on('ready', event_create);
    app.on('window-all-closed', event_close);
    app.on('activate', event_activate);
}
main();