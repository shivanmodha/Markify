const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const marked = require('marked');
let MainWindow;
function event_create()
{
    MainWindow = new BrowserWindow(
        {
            width: 800,
            height: 600,
            title: "Markify",
            show: false
        });
    let html_csslink = "<head><link rel=\"stylesheet\" type=\"text/css\" href=\"styles/kult.css\"/></head>\n"
    let html_md = marked("# BEHEAD THAT WERE STILL");
    console.log(html_csslink + html_md);
    let html_url = 'data:text/html,' + encodeURIComponent(html_csslink + html_md);
    MainWindow.loadURL(html_url);
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