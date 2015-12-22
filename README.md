# winston-dconsole

A winston transport providing an extended console which outputs winston log messages including filename and 
 linenumber of the call. This is suitable for using it with the 
 [intellij-awesome-console](https://github.com/anthraxx/intellij-awesome-console) IntelliJ IDEA plugin. It extends the 
 log output by adding the source code file name and line number of the logger statement executed. The output is added 
 to the log label. If the filename without extension matches the label the filename and line number replaces the label 
 in the log output. Note, the DConsole feature is provided by analyzing the call stack for each log output, the 
 execution is rather slow! For this reason, DConsole should only be used for development purposes. It's experimental!
 
 
## Example

    var winston = require('winston'),
        debug = require('winston-dconsole');
    
    winston.add(debug.Dconsole, {
        "timestamp": true,
        "level": "debug"
    });
    
    winston.log('debug', 'Now my debug messages are written to dconsole!');