/**
 * Вяся Хобот
 */


require('coffee-script');

var config = require('./config');
var hubot = require('hubot');
var path = require('path');
var fs = require('fs');


var env = process.env.NODE_ENV || 'development';
var production = env === 'production';

var hubotScriptsPath = path.join(__dirname, 'node_modules', 'hubot-scripts', 'src', 'scripts');
var adapterPath = path.join(__dirname, 'node_modules', 'hubot', 'src', 'adapters');
var helpersPath = path.join(__dirname, 'helpers');

var enableHttpd = true;
var adapter = production ? 'skype' : 'shell';
var alias = 'Вась';
var name = 'Вася';

var robot = hubot.loadBot(adapterPath, adapter, enableHttpd, name);

robot.config = config;
robot.alias = alias;
robot.helpers = {};

fs.readdirSync(helpersPath).forEach(function(file) {
    if (/\.(js|coffee)$/.test(file)) {
        require(path.join(helpersPath, file))(robot);
    }
});

robot.adapter.on('connected', function() {
    robot.load(path.join(__dirname, 'scripts'));

    if (production) {
        robot.loadHubotScripts(hubotScriptsPath, ['redis-brain.coffee']);
    } 
});

robot.run();