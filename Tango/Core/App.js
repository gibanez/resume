'use strict';
var express     = require('express');
var bodyParser  = require('body-parser');
var session     = require('express-session');

var App = function (port) {
    var self = this;
    self.routes = [];
    self.watches = [];
    self.server = express();
    self.server.use( bodyParser.json() );       // to support JSON-encoded bodies
    // to support URL-encoded bodies
    self.server.use(bodyParser.urlencoded({extended: true}));
    self.server.use(session({secret:"node-gallery-test",saveUninitialized: true,resave: true}));
    self.server.use(express.static('public'));
    self.server.use(express.static('node_modules'));
    self.server.use(express.static('bower_components'));
    self.port = port || 80;

    self.watch = function(key, callback)
    {
        self.watches.push([key, callback]);
    };

    self.addRoute = function(uri, callback, method)
    {
        self.routes.push({uri:uri, callback:callback, method:method})
    };
    self.run = function ()
    {
        self.server.use(function (req, res, next)
        {
           next();
        });
        self.routes.forEach(function(route)
        {
            var method = route.method.toLowerCase();
            var callback = route.callback.split('@'), ctrl = callback[0],action = callback[1];
            try
            {
                var ClassCtrl = AppRequire('Controller/' + ctrl);
            }
            catch (e)
            {
                console.info(e);
                throw e;
            }

            self.server[method](route.uri, function(req, res)
            {
                self.watches.map(function(watch)
                {
                    if(req.params[watch[0]])
                    {
                        req.params['wathes'] = {};
                        req.params['wathes'][watch[0]] = watch[1](req);
                    }
                });

                var objCtrl = new ClassCtrl(req, res);
                objCtrl[action](req.params);
            });

        }, self);





        self.server.listen(self.port, function ()
        {

            console.log('INIT SERVER: localhost:' + self.port);
            //console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
            //console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
            //console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
            //console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
        })
    };
};

module.exports = App;