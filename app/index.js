'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var win32 = process.platform === 'win32';

var AppGenerator = module.exports = function Appgenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    this.folklore = this.read('folklore.txt');
}

util.inherits(AppGenerator, yeoman.generators.NamedBase);

AppGenerator.prototype.askFor = function askFor(name) {

    var cb = this.async();

    // welcome message
    console.log('\n\n'+this.folklore);
    console.log('Laravel Boilerplate');
    console.log('\n\n');

    //Check if name is provided as an argument
    var prompts = [];
    if(!name || !name.length) {
        prompts.push({
            name: 'projectHost',
            message: 'What is the host of your project?'
        });
    } else {
        this.projectHost = name;
    }

    //Features prompt
    prompts.push({
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [{
            name: 'Admin section',
            value: 'admin',
            checked: true
        },{
            name: 'Node server',
            value: 'node',
            checked: false
        }]
    });

    //Prompt
    this.prompt(prompts, function (answers) {

        this.projectHost = answers.projectHost ? answers.projectHost.toLowerCase():this.projectHost;

        var features = answers.features;
        function hasFeature(feat) { return features.indexOf(feat) !== -1; }

        this.includeAdmin = hasFeature('admin');
        this.includeNode = hasFeature('node');

        cb();

    }.bind(this));
};

AppGenerator.prototype.fetchLaravel = function fetchLaravel() {

    var cb = this.async();

    this.remote('laravel', 'laravel', 'v4.2.0', function (err, remote) {
        if (err) {
            return cb(err);
        }
        remote.directory('.', '.');
        cb();
    },true);
};

AppGenerator.prototype.fetchBoilerplate = function fetchBoilerplate() {

    var cb = this.async();

    this.remote('folkloreatelier', 'yeoman-boilerplate-laravel', 'master', function (err, remote) {
        if (err) {
            return cb(err);
        }
        remote.directory('.', '.');
        cb();
    },true);
};

AppGenerator.prototype.fetchAdmin = function fetchAdmin() {
    if(this.includeAdmin) {

        var cb = this.async();

        this.remote('folkloreatelier', 'yeoman-boilerplate-laravel-admin', 'master', function (err, remote) {
            if (err) {
                return cb(err);
            }
            remote.directory('.', '.');
            cb();
        },true);

    } else {
        return;
    }
};

AppGenerator.prototype.fetchNode = function fetchNode() {
    if(this.includeNode) {
        this.tarball('https://github.com/folkloreatelier/yeoman-boilerplate-laravel-admin/tarball/master', '.', this.async());
    } else {
        return;
    }
};

AppGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js','Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json','package.json');
};

AppGenerator.prototype.bowerJSON = function bowerJSON() {
    this.template('_bower.json','bower.json');
};

AppGenerator.prototype.installDependencies = function postInstall() {

    var commands = [
        'npm install',
        'bower install',
        'composer install'
    ];

    if(this.options['skip-install-dependencies']) {
        console.log('\n\nInstall dependencies:\n');
        for(var i = 0; i < commands.length; i++) {
            console.log(commands[i]+'\n');
        }
        return;
    }

    var cb = this.async();

    this._runCommands(commands,cb);

};

AppGenerator.prototype.installLaravel = function installLaravel() {

    var commands = [
        'php artisan asset:publish folklore/image',
        'php artisan config:publish folklore/image'
    ];

    if(this.options['skip-install-dependencies'] || this.options['skip-install-laravel']) {
        for(var i = 0; i < commands.length; i++) {
            console.log('\n\nInitialize Laravel:\n');
            console.log(commands[i]+'\n');
        }
        return;
    }

    var cb = this.async();

    this._runCommands(commands,cb);
};

AppGenerator.prototype.setPermissions = function setPermissions() {

    var commands = [
        'chmod -R 777 app/storage',
        'chmod -R 777 public/files'
    ];

    if(this.options['skip-install-permissions']) {
        for(var i = 0; i < commands.length; i++) {
            console.log('\n\nSet permissions:\n');
            console.log(commands[i]+'\n');
        }
        return;
    }

    var cb = this.async();

    this._runCommands(commands,cb);
};

AppGenerator.prototype.buildAdminAssets = function buildAdminAssets() {

    if(!this.includeAdmin) {
        return;
    }

    var commands = [
        'grunt build:admin'
    ];

    if(this.options['skip-build-admin']) {
        for(var i = 0; i < commands.length; i++) {
            console.log('\n\nBuild admin assets:\n');
            console.log(commands[i]+'\n');
        }
        return;
    }

    var cb = this.async();

    this._runCommands(commands,cb);
};


AppGenerator.prototype._runCommands = function _runCommands(commands,cb) {

    var loadedTotal = commands.length;
    var loadedCount = 0;
    for(var i = 0; i < commands.length; i++) {
        var commandParts = commands[i].split(' ');
        var commandName = commandParts[0];
        var commandArgs = commandParts.slice(1);
        var commandPromise = spawn(commandName, commandArgs, { stdio: 'inherit' });
        commandPromise.on('close', function (code)
        {
            loadedCount++;
            if(loadedCount == loadedTotal)
            {
                cb();
            }
        });
    }

};
