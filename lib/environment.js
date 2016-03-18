'use strict';

require('shelljs/global');

const prompt = require('prompt');
const chalk = require('chalk');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const frame = elegantSpinner();

const Base = require('./base')

// prompt config
prompt.message = "";
prompt.delimiter = "";

function install(){
  Base.checkGit();

  let dir = 'koa-grace';

  if (!test('-d', './koa-grace')) {

    Base.gitPull('https://github.com/xiongwilee/koa-grace.git');

  } else {

    _reinstall(function(result) {

      if (result.reinstall == 'Y') {

        mv('koa-grace', 'koa-grace-' + Date.now());

        Base.gitPull('https://github.com/xiongwilee/koa-grace.git');

      } else {
        console.error(chalk.red('\nerror: You can remove `koa-grace` dir and try again.'));
      }
    })
  }
}

function _reinstall(callback) {
  prompt.start();
  prompt.get([{
    name: 'reinstall',
    description: chalk.yellow('koa-grace path already exists, will you reinstall koa-grace? [Y/n] :'),
    required: true
  }], function(err, result) {
    result = result || {};
    callback(result);
  });
}

exports.install = install;