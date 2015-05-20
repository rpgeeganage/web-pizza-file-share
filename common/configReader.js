/**
 * Created by ruwang on 5/10/15.
 */
var ConstantSet = require('./constantSet');
var Log = require('./logWriter');

var configReader = {

    getPath: function(folderPath, fileName) {
        return  require('path').join(folderPath, fileName);
    },

    getFileContent : function(path) {
        return require("fs").readFileSync(path);
    },

    readLockerTemplate : function(configFolder, templateFile) {
        return JSON.parse(this.getFileContent(this.getPath(configFolder, templateFile)));
    },

    readConfigFile : function(configFolder, configFile) {
        return JSON.parse(this.getFileContent(this.getPath(configFolder, configFile)));
    },

    readConfig: function() {
        try {
            Log.info("{configReader} {readConfig} Started Reading");
            return this.readConfigFile(ConstantSet.CONFIG_FOLDER, ConstantSet.CONFIG_FILE);
        }catch(err){
            Log.error("{configReader} {readConfig} " + err.stack);
        }
    },
    getLockerTemplate: function() {
        try {
            Log.info("{configReader} {getLockerTemplate} Reading Locker Template");
            return this.readConfigFile(ConstantSet.CONFIG_FOLDER, ConstantSet.CONFIG_LOCKER_TEMPLATE);

        }catch(err){
            Log.error("{configReader} {getLockerTemplate} " + err.stack);
        }
    }

};

module.exports = configReader;