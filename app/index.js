'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var win32 = process.platform === 'win32';

var AppGenerator = module.exports = function Appgenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        if (options['skip-install']) {
            console.log('\n\nI\'m all done. Just run ' + 'npm install & bower install --dev' + ' to install the required dependencies.\n\n');
        } else {
            console.log('\n\nI\'m all done. Running ' + 'npm install & bower install' + ' for you to install the required dependencies. If this fails, try running the command yourself.\n\n');

            //NPM
            spawn('npm', ['install'], { stdio: 'inherit' });

            //Bower
            spawn('bower', ['install'], { stdio: 'inherit' });

            //Composer
            var composer = spawn('composer', ['install'], { stdio: 'inherit' });
            composer.on('close', function (code) {

                //Publish assets
                spawn('php', ['artisan','asset:publish','bkwld/croppa'], { stdio: 'inherit' });

                //Publish config
                spawn('php', ['artisan','config:publish','bkwld/croppa'], { stdio: 'inherit' });
            });

            //Permissions
            spawn('chmod', ['-R','777','app/storage'], { stdio: 'inherit' });
            spawn('chmod', ['-R','777','public/files'], { stdio: 'inherit' });
            
        }
    });

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
        }]
    });

    //Prompt
    this.prompt(prompts, function (answers) {

        this.projectHost = answers.projectHost ? answers.projectHost.toLowerCase():this.projectHost;

        var features = answers.features;
        function hasFeature(feat) { return features.indexOf(feat) !== -1; }

        this.includeAdmin = hasFeature('admin');

        cb();

    }.bind(this));
};

AppGenerator.prototype.fetchGit = function fetchGit() {
    this.tarball('https://github.com/folkloreatelier/yeoman-boilerplate-laravel/tarball/master', '.', this.async());
};

AppGenerator.prototype.fetchAdmin = function fetchAdmin() {
    if(this.includeAdmin) {
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

AppGenerator.prototype.bowerJSON = function componentJSON() {
    this.template('_bower.json','bower.json');
};
