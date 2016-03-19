'use strict';

require('shelljs/global');
const path = require('path');
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

  Base.checkDir('./' + dir, {
    none: function(){

      Base.gitPull(global.config.uri[dir]);

    },
    exist: function(){

      _reinstall(dir, function(result) {

        if (result.reinstall == 'Y') {

          mv(dir, dir + '-' + Date.now());

          Base.gitPull(global.config.uri[dir]);

        } else {
          console.error(chalk.red('\nerror: You can remove `' + dir + '` dir and try again.'));
        }
      })      
    }
  });
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

/**
 * 安装koa-grace模块
 */
exports.install = function(){
  install('koa-grace');
};

/**
 * 安装koa-grace-app模块
 */
exports.app = function(mod){
  if(mod.length == 0){
    install('koa-grace-app');
  }
};

/**
 * 编译业务模块
 * @param {String,Array} [mod] [模块名称]
 */
exports.build = function(mod) {
  let appPath = path.resolve(koaGraceConfig.path.app);
  
  cd(appPath);

  let command = 'gulp build --env=production --mod=' + mod.join(',')

  exec(command, {async:false});
}