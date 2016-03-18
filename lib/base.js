'use strict';

require('shelljs/global');

let chalk = require('chalk');
let elegantSpinner = require('elegant-spinner');
let logUpdate = require('log-update');
let frame = elegantSpinner();


// global interval
let interval;
function setTimerText(text) {
  interval = setInterval(function() {
    logUpdate(text + chalk.cyan.bold.dim(frame()));
  }, 50);
}

function stopTimerText() {
  clearInterval(interval);
}

function checkNpm() {
  if (!which('npm')) {
    console.log(chalk.red('Sorry, this script requires npm, please install npm first!'));
    exit(1);
  }
}

function checkGit() {
  if (!which('git')) {
    console.log(chalk.red('Sorry, this script requires git, please install git first!'));
    exit(1);
  }
}


function gitPull(path, text, callback) {
  let defaultText = {
      start:"Cloning from " + path + "...",
      success:'Clone Completed !',
      error:'Error! Try again'
  };

  if(typeof text != 'object'){
    callback = text;
    text = defaultText;
  }else{
    Object.assgin(defaultText, text);
  }

  exec('git init', {
    async: true,
    silent: true
  });

  setTimerText(text.start);

  let e = exec('git clone ' + path, {
    async: true,
    silent: true
  }, function(code, stdout, stderr) {
    stopTimerText();

    if (code !== 0) {
      console.log(chalk.red.bold(text.error));
      exit(1);
    }

    console.log(chalk.green.bold(text.success))

    callback && callback();
  }, '/dev/null');
}

exports.setTimerText = setTimerText;
exports.stopTimerText = stopTimerText;
exports.checkNpm = checkNpm;
exports.checkGit = checkGit;
exports.gitPull = gitPull;