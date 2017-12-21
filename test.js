/*
* @Author: mahesh
* @Date:   2017-12-20 21:53:39
*/

const CtnApiClient = require('./index.js');

var device = {};
var lastMsgId;

function initApiClient() {
    var env = {
	    defaultDevice: {
	        deviceId: 'dmM2Dz32agLSGsSuoxsR',
	        apiAccessSecret: '99e3eb869b089e1f0e4ec4847aac01c6a82949eff19dbd10da9650eda525307ffc44715ae773d8cc8ca3f5515167b5ffd7cc16ffc567cb2c8a6e91013d0d1f38'
	    },
	    opts: {
	        host: 'beta.catenis.io',
	        secure: true
	    }
	}

    if (!device.deviceId) {
        device = env.defaultDevice;
    }

    ctnApiClient = new CtnApiClient(device.deviceId, device.apiAccessSecret, env.opts);
}

function logMessage(message, encoding, encrypt, storage) {
    ctnApiClient.logMessage(message, {
        encoding: encoding,
        encrypt: encrypt,
        storage: storage
    }, processMessageResult);
}

function processMessageResult(err, data) {
    if (!err && typeof data.data === 'object' && data.data !== null && typeof data.data.messageId === 'string') {
        lastMsgId = data.data.messageId;
    }

    processResult(err, data);
}

initApiClient();
logMessage("hello", "utf8", true, "auto");
