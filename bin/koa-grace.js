#!/usr/bin/env node

'use strict';

let program = require('commander');
let prompt = require('prompt');
let chalk = require('chalk');
let elegantSpinner = require('elegant-spinner');
let logUpdate = require('log-update');
let frame = elegantSpinner();
require('shelljs/global');

// prompt config
prompt.message = "";
prompt.delimiter = "";

// global interval
let interval;

program
// .command('koa-grace')
  .description('A new generation Nodejs multi-app MVC framework')
  .version('0.0.1')
  .option('-i, --install', '在当前目录安装koa-grace服务')
/*  .option('-u, --update', '更新koa-grace及koa-grace-cli')
  .option('-r, --restart', '重启koa-grace服务')
  .option('-p, --stop', '关闭koa-grace服务')
  .option('-s, --start', '启动koa-grace生产环境，如线上服务')
  .option('-d, --debug', '启动koa-grace调试状态，命令行中输入`rs`即可重启')
  .option('-e, --example', '生成一个koa-grace的案例')
  .option('-l, --log', '查看log')
  .option('-lj, --log-static', '查看静态文件请求日志')
  .option('-ls, --log-server', '查看其他服务请求日志')
  .option('-lm, --log-mongo', '查看其他mongo请求日志')
  .option('-le, --log-error', '查看错误日志')*/
  .parse(process.argv);

// 如果不存在参数就返回help
if (!process.argv.slice(2).length) {
  program.help();
}

if (program.install) {
  install();
} else if (program.u) {

}

function install(){
  _checkGit();

  let dir = 'koa-grace';

  if (!test('-d', './koa-grace')) {

    _gitPull('https://github.com/xiongwilee/koa-grace.git');

  } else {

    _reinstall(function(result) {

      if (result.reinstall == 'Y') {

        mv('koa-grace', 'koa-grace-' + Date.now());

        _gitPull('https://github.com/xiongwilee/koa-grace.git');

      } else {
        console.error(chalk.red('\nerror: You can remove `koa-grace` dir and try again.'));
      }
    })
  }
}

function _gitPull(path, callback) {
  exec('git init', {
    async: true,
    silent: true
  });

  _setTimer("Cloning into 'koa-grace'...");

  let e = exec('git clone ' + path, {
    async: true,
    silent: true
  }, function(code, stdout, stderr) {
    _stopTimer();

    if (code !== 0) {
      console.log(chalk.red.bold('Error! Try again'));
      exit(1);
    }

    console.log(chalk.green.bold('Koa-grace clone Completed !'))

    callback && callback();
  }, '/dev/null');
}

function _setTimer(text) {
  interval = setInterval(function() {
    logUpdate(text + chalk.cyan.bold.dim(frame()));
  }, 50);
}

function _stopTimer() {
  clearInterval(interval);
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

function checkNpm() {
  if (!which('npm')) {
    console.log(chalk.red('Sorry, this script requires npm, please install npm first!'));
    exit(1);
  }
}

function _checkGit() {
  if (!which('git')) {
    console.log(chalk.red('Sorry, this script requires git, please install git first!'));
    exit(1);
  }
}