/**
 * Created by ruwang on 5/10/15.
 */
//Npm Modules
var crypto = require('crypto');
var fs = require("fs");
var path = require("path");

//Custom Modules
var Log = require('../common/logWriter');
var ConstantSet = require('./constantSet');
var configSet = require('../common/configReader.js');

var config = configSet.readConfig();
var lockerTemplate = configSet.getLockerTemplate();


var locker = {
    createLocker : function(urlBulk) {
        var lockerFile = lockerTemplate;
        var passCodeBuffer = this.getPassCode();

        lockerFile.pass_code = passCodeBuffer;
        lockerFile.url_set = urlBulk;

        this.writeFile(lockerFile.pass_code , JSON.stringify(lockerFile));
        return lockerFile.pass_code;
    },
    getAllLocker: function() {

    },
    getLockerByPassCode: function(passCode) {
        var filePath = this.getLockerPath(passCode);
        if(fs.existsSync(filePath)) {
            return JSON.parse(this.getFileContent(filePath));
        } else {
            return false;
        }
    },
    writeFile : function(lockerFileName, fileContent) {
        try {
            Log.info("{locker} {writeFile} Started Reading");
            //var filePath = path.join(config.private_map_file_locket, lockerFileName + ConstantSet.CONFIG_LOCKER_FILE_EXT);
            var filePath = this.getLockerPath(lockerFileName);
            fs.writeFileSync(filePath, fileContent);
        }catch(err){
            Log.error("{locker} {writeFile} " + err.stack);
        }
    },
    getPassCode : function() {
        var byteArray = crypto.randomBytes(256);
        var md5 = crypto.createHash('md5');
        md5.update(byteArray);
        return md5.digest('hex');
    },
    getLockerPath : function(passCode) {
        return path.join(config.private_map_file_locket, passCode + ConstantSet.CONFIG_LOCKER_FILE_EXT);
    },
    getFileContent : function(path) {
        return require("fs").readFileSync(path);
    }
}

module.exports = locker;