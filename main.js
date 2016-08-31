'use strict';
global.log = function(data)
{
    console.log(data);
};

global.AppRequire = function(name)
{
    return require(__dirname + '/App/' + name);
};
global.TangoRequire = function(name)
{
    return require(__dirname + '/Tango/' + name);
};
global.myDB = function()
{
    return db;
};
global.ROOT = __dirname;

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var dbURI = 'mongodb://localhost/resume';
var options = {};

if(process.env.production)
{
    dbURI = 'mongodb://30-2a.mongo.evennode.com:27017/0709d947e64c972d6add429d470816db';


    options = {
        user: '0709d947e64c972d6add429d470816db',
        pass: 'gei28223197'

    };
    //mongoose.connect(uri, options);
}

mongoose.connect(dbURI, options);
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});
// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('ERROR: ' + err);
});

var App = TangoRequire('Core/App');
var app = new App(80);

app.addRoute('/',           'MainCtrl@index', 'GET');
app.addRoute('/populate',   'MainCtrl@generateData', 'GET');
app.addRoute('/query',      'MainCtrl@getData', 'GET');
app.run();
