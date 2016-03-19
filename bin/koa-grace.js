#!/usr/bin/env node

'use strict';

const path = require('path');
const program = require('commander');

const config = global.config = require('../config/main');
const environment = require('../lib/environment');

const koaGraceConfigPath = path.resolve(config.path['koa-grace:config']);
const koaGraceConfig = global.koaGraceConfig = require(koaGraceConfigPath);

program
// .command('koa-grace')
// .description('新一代基于koa的nodejs多应用MVC框架')
  .version('0.0.1')
  .option('-i, --install', '在当前目录安装koa-grace服务：生成koa-grace目录')
  .option('-a, --app', '在当前目录安装koa-grace-app服务：生成koa-grace-app目录')
  .option('-b, --build', '编译模块')
  .option('-s, --start [mod]', '启动服务并监听模块')
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
  environment.install();
} else if (program.app) {
  environment.app(program.args);
} else if (program.build) {
  environment.build(program.args);
}