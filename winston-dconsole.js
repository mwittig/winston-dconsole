'use strict';

var winston = require('winston'),
    colors = require('colors'),
    util = require('util'),
    stackTrace = require('stack-trace'),
    path = require('path');


function traceCaller() {
    var trace = stackTrace.get(Dconsole.prototype.log);

    if (trace.length >= 7) {
        var functionName = trace[5].getFunctionName() || "",
            fileName = trace[5].getFileName() || "";

        if ((functionName.indexOf("target") == 0 && fileName.indexOf("common.js") > 0) ||
                (functionName.indexOf("winston") == 0 && fileName.indexOf("winston.js") > 0)) {
            return trace [6]
        }
        else {
            return trace [5]
        }
    }
    return null;
}


/**
 * Creates a Dconsole winston transport.
 * @class
 * @classdesc
 * Dconsole is an extended version of the winston Console transport for debugging purposes. It extends the log output by
 * adding the source code file name and line number of the logger statement executed. The output is added to the
 * log label. If the filename without extension matches the label the filename and line number replaces the label in the
 * log output.
 * Note, the DConsole feature is provided by analyzing the call stack for each log output, the execution is
 * rather slow! For this reason, DConsole should only be used for development purposes. It's experimental!
 * @extends winston.transports.Console
 */
var Dconsole = exports.Dconsole = function (options) {

    winston.transports.Console.call(this, options);
    options = options || {};

    // Set transport name
    this.name = 'dconsole';

    this.highlightLabel = !!options.label && !!options.highlightLabels &&
        options.highlightLabels.indexOf(this.label) >= 0;
};

util.inherits(Dconsole, winston.transports.Console);

// Hook DConsole into winston's range of transports
winston.transports.Dconsole = Dconsole;


Dconsole.prototype.log = function (level, msg, meta, callback) {
    var orgLabel = this.label;
    var trace = traceCaller();
    var traceStr = "";
    if (trace !== null) {
        traceStr = path.basename(trace.getFileName()) + ":" + trace.getLineNumber() + ":" + trace.getColumnNumber();
    }
    if (this.label === null || orgLabel === (traceStr.substr(0, traceStr.lastIndexOf('.')) || "error")) {
        this.label = traceStr;
    }
    else {
        this.label = orgLabel + ', ' + traceStr;
    }
    if (this.highlightLabel) {
        this.label = this.label.red;
    }
    Dconsole.super_.prototype.log.call(this, level, msg, meta, callback);
    this.label = orgLabel;
};