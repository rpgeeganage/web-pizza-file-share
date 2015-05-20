/**
 * Created by ruwang on 5/10/15.
 */
//Node modules
var express = require('express');
var bodyParser = require('body-parser');

//Custom modules
var Log = require('../common/logWriter');
var Locker = require('../common/locker');

//Reading configurations
var configs = require('../common/configReader.js').readConfig();

//Building express server
var app = express();

//Server port
app.listen(configs.client_port);

//Setting up public folder
app.use(express.static('public'));

//Parse requests
app.use(bodyParser());


//Start routing
app.get('/',function(req,res){

});
app.post('/create-locker',function(req, res){
    var urlSet =  req.body.urlSet;
    if(urlSet && urlSet.length > 0) {
        var lockerPassCode = Locker.createLocker(urlSet);
        res.send(JSON.stringify({lockerPasscode: lockerPassCode}));

    } else {
        res.status(500).send('Empty URL set');
    }
});
Log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
Log.info("Client started at listening to : " + configs.client_port);
Log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
