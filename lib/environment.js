'use strict';

require('shelljs/global');
const config = global.config = require('../config/main');
const prompt = require('prompt');
const chalk = require('chalk');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const frame = elegantSpinner();

const Base = require('./base');

// prompt config
prompt.message = "";
prompt.delimiter = "";

function install(dir){
  Base.checkGit();

  if (!test('-d', './' + dir)) {

    Base.gitPull(global.config.uri[dir]);

  } else {

    _reinstall(dir, function(result) {

      if (result.reinstall == 'Y') {

        mv(dir, dir + '-' + Date.now());

        Base.gitPull(global.config.uri[dir]);

      } else {
        console.error(chalk.red('\nerror: You can remove `' + dir + '` dir and try again.'));
      }
    })
  }
}

function _reinstall(dir, callback) {
  prompt.start();
  prompt.get([{
    name: 'reinstall',
    description: chalk.yellow(dir + ' path already exists, will you reinstall ' + dir + '? [Y/n] :'),
    required: true
  }], function(err, result) {
    result = result || {};
    callback(result);
  });
}

exports.install = function(){
  install('koa-grace');
};

exports.app = function(){
  install('koa-grace-app');
};