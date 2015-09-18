var winston = require('winston'),
    debug = require('./winston-dconsole');

winston.add(debug.Dconsole, {
    "timestamp": true,
    "level": "debug"
});

winston.log('debug', 'Now my debug messages are written to dconsole!');