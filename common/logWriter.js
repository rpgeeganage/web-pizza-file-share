/**
 * Created by ruwang on 5/10/15.
 */
var colors = require('colors/safe');
var logWriter = {
    types : {
      ERROR : 'ERROR',
      WARN : 'WARN',
      INFO  : 'INFO'
    },
    error : function(msg) {
        this.write(this.types.ERROR,msg, colors.red);
    },
    warn : function(msg) {
        this.write(this.types.WARN,msg, colors.yellow);
    },
    info : function(msg) {
        this.write(this.types.INFO,msg, colors.blue);
    },
    write : function(type, msg, color) {
        console.log(color("\n[" + getTimeStamp()+"][" + type + "]\t"+msg));

    }

}

function getTimeStamp() {
    var now = new Date();
    return now.getFullYear() + '-' +
        (now.getMonth()+1) + '-' +
        now.getDate() + '_' +
        now.getHours() + '.' +
        now.getMinutes() + '.' +
        now.getSeconds() + '.' +
        now.getMilliseconds();
}
module.exports = logWriter;
