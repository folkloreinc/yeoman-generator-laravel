'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var win32 = process.platform === 'win32';


module.exports = AppGenerator;

function AppGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        console.log('\n\nI\'m all done. Just run ' + 'npm install & bower install --dev'.bold.yellow + ' to install the required dependencies.\n\n');
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    this.folklore = this.read('folklore.txt');
}

util.inherits(AppGenerator, yeoman.generators.NamedBase);

AppGenerator.prototype.askFor = function askFor(name) {
    var cb = this.async();

    // welcome message
    console.log('\n\n'+this.folklore.green);
    console.log('Laravel Boilerplate');
    console.log('\n\n');

    if(!name || !name.length) {
        var prompts = [{
            name: 'projectHost',
            message: 'What is the host of your project?'
        }];

        this.prompt(prompts, function (err, props) {
            if (err) {
                return this.emit('error', err);
            }

            this.projectHost = props.projectHost.toLowerCase();

            cb();
        }.bind(this));
    } else {
        this.projectHost = name;
        cb();
    }
};

AppGenerator.prototype.fetchGit = function fetchGit() {
    this.tarball('https://github.com/folkloreatelier/yeoman-boilerplate-laravel/tarball/master', '.', this.async());
};

AppGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js','Gruntfile.js',{
        projectHost : this.projectHost
    });
};

AppGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json','package.json',{
        projectHost : this.projectHost
    });
};

AppGenerator.prototype.componentJSON = function componentJSON() {
    this.template('_component.json','component.json',{
        projectHost : this.projectHost
    });
};

AppGenerator.prototype.mainJS = function mainJS() {
    this.copy('main.js','public/js/main.js');
};

AppGenerator.prototype.backbone = function backbone() {
    this.directory('app','public/js/app');
};
