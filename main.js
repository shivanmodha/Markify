const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const marked = require('marked');
const fs = require('fs');
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
    fs.readFile("styles/kult.css", function (e1, d1)
    {
        let css = d1.toString();
        fs.readFile("delme.md", function (e2, d2)
        {
            let html = marked(d2.toString());
            css = "<style>\n" + css + "</style>";
            let html_url = "data:text/html," + encodeURIComponent(css + html);
            MainWindow.loadURL(html_url);
            MainWindow.on('closed', event_destroy);
            MainWindow.on('ready-to-show', event_load);
        });
    });
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