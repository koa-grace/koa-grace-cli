"use strict";

let env = process.env.ENV || 'development';

module.exports = {
  path:{
    'koa-grace':'../koa-grace/',
    'koa-grace:config':'../koa-grace/src/config.js',
  },
  uri:{
    'koa-grace':'https://github.com/xiongwilee/koa-grace.git',
    'koa-grace-app':'https://github.com/koa-grace/koa-grace-app.git',
  }
}