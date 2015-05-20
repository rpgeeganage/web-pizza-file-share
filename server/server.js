//Node modules
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

//Custom modules
var downloader = require('./downloader');
var Log = require('../common/logWriter');
var Locker = require('../common/locker');

//Reading configurations
var configs = require('../common/configReader.js').readConfig();


//Reading configurations
var configs = require('../common/configReader.js').readConfig();

//Building express server
var app = express();

//Server port
app.listen(configs.online_server_port);

//Setting up public folder
app.use(express.static('public'));

//Parse requests
app.use(bodyParser());

//Start routing
app.get('/',function(req,res){

});

app.get('/get-secret-file-status/:passcode',function(req,res) {
    var passCode = req.params.passcode;
    if(passCode) {
        var locker = Locker.getLockerByPassCode(passCode);
        if(locker) {
            res.status(200).json('ok');
        } else {
            res.status(404).json('No pass code found');
        }
    } else {
        res.status(404).json('No pass code found');
    }

});

app.post('/get-secret-file',function(req,res){
    var passCode = JSON.parse(req.body.tmp).passcode;
    if(passCode) {
        var locker = Locker.getLockerByPassCode(passCode);
        if(locker) {
            downloader(locker.url_set, res);
        }
    }
});
Log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
Log.info("Server started at listening to : " + configs.online_server_port);
Log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");