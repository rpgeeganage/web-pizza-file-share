var http = require('http');
var url = require('url');
var path = require('path');
var _ = require('underscore');

//Reading configurations
var configs = require('../common/configReader.js').readConfig();

var Log = require('../common/logWriter');
var archiver = require('archiver');
var archive;

var finishedCount = 0;
var totalCount = 0;

var makeGetRequest = function(urlSet, resp) {

    finishedCount = 0;
    totalCount = urlSet.length;
    archive = archiver('zip');
    _.each(urlSet, function(fileUrl){
        executeDownLoad(fileUrl,resp);
    });
}

var executeDownLoad = function(fileUrl, primaryResponse) {
    try {
        if(configs.tor.enabled) {
            Log.info("{makeGetRequest} {executeDownLoad} TOR enabled");
            Log.info("{makeGetRequest} {executeDownLoad} TOR Configs : " + JSON.stringify(configs.tor));
            var url = require('url');
            var urlParsed = url.parse(fileUrl);
            switch(urlParsed.protocol) {
                case 'https:':
                  http  = require('socks5-https-client');
                  Log.info("{makeGetRequest} {executeDownLoad} Using HTTPS Client");
                break;
                case 'http:':
                default:
                    Log.info("{makeGetRequest} {executeDownLoad} Using HTTP Client");
                    http = require('socks5-http-client'); 
            }
            urlParsed.socksPort = configs.tor.port;
            
            http.get(urlParsed, function (secondaryResponse) {downloadFile(primaryResponse, fileUrl, secondaryResponse); });
            
        } else {
            Log.info("{makeGetRequest} {executeDownLoad} TOR NOT enabled");
            Log.info("{makeGetRequest} {executeDownLoad} TOR Configs : " + JSON.stringify(configs.tor));
            http.get(fileUrl, function (secondaryResponse) {downloadFile(primaryResponse, fileUrl, secondaryResponse); });
        }
          
    } catch (err) {
        Log.error("{makeGetRequest} {executeDownLoad} " + err.stack);
    }
};

function downloadFile(primaryResponse, fileUrl, secondaryResponse) {
    Log.info("{makeGetRequest} {executeDownLoad} {downloadFile}");
    try {
        if (secondaryResponse.statusCode > 300 && secondaryResponse.statusCode < 400 && secondaryResponse.headers.location) {
            var redirectUrl = url.parse(secondaryResponse.headers.location).hostname ? secondaryResponse.headers.location
                :url.parse(fileUrl).hostname + url.parse(fileUrl).path;
            executeDownLoad(redirectUrl, primaryResponse);
        } else {

            var fileName = path.basename(fileUrl);
            if(fileName == false) {
                fileName = generateFileName();
            }
            var data = [], dataLen = 0;
            secondaryResponse.on('data', function(chunk) {
                try {
                    data.push(chunk);
                    dataLen += chunk.length;
                } catch(err) {
                    Log.error("{makeGetRequest} {executeDownLoad} {downloadFile} ( ON data )Error ->" + err);
                    primaryResponse.set(500).json("Error occurred... Please try again or contact the sender");
                }

            }).on('end', function() {
                try {
                    Log.info("{makeGetRequest} {executeDownLoad} {downloadFile} Execute for a file");
                    memoryUsage();
                    var buf = new Buffer(dataLen);

                    for (var i=0, len = data.length, pos = 0; i < len; i++) {
                        data[i].copy(buf, pos);
                        pos += data[i].length;
                    }
                    archive.append(buf, { name:fileName });
                    buf = null;
                    Log.info("{makeGetRequest} {executeDownLoad} {downloadFile} Buffer reset");
                    memoryUsage();
                    finishedCount++;
                    if(finishedCount == totalCount) {
                        archive.finalize();
                        sendArchiveFile(primaryResponse);
                    }
                } catch(err) {
                     Log.error("{makeGetRequest} {executeDownLoad} {downloadFile} ( ON end )Error ->" + err);
                     primaryResponse.set(500).json("Error occurred... Please try again or contact the sender");
                }
            });
        }
    } catch(err) {
        Log.error("{makeGetRequest} {executeDownLoad} {downloadFile} ( ON end )Error ->" + err);
        primaryResponse.set(500).json("Error occurred... Please try again or contact the sender");
    }
}

function sendArchiveFile(primaryResponse) {
    var fileName = generateFileNameWithExt();
    Log.info("{makeGetRequest} {executeDownLoad} {sendArchiveFile} sending archive file ->" + fileName);
    primaryResponse.setHeader('Content-type', 'application/download');
    primaryResponse.setHeader('Content-disposition', 'attachment; filename='+fileName);
    archive.pipe(primaryResponse);
}
function generateFileNameWithExt() {
    return generateFileName() +".zip";
}
function generateFileName() {
    var crypto = require('crypto');
    return crypto.randomBytes(Math.ceil(10 * 3 / 4)).toString('base64').slice(0, 10).replace(/\+/g, '0').replace(/\//g, '0')

}
function memoryUsage() {
  var util = require('util');
  var memUsage =  process.memoryUsage();
  Log.info("{makeGetRequest} {memoryUsage} Heap Total : " + (memUsage.heapTotal/(1024 * 1024)) + " MB");
  Log.info("{makeGetRequest} {memoryUsage} Heap Used : " + (memUsage.heapUsed/(1024 * 1024)) + " MB");
}
module.exports = makeGetRequest;