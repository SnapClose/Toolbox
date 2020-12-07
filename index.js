const chalk = require('chalk');
const Levels = {
  critical: {
    name: 'Critical',
    weight: 0,
    color: chalk.black.bgRed,
  },
  error: {
    name: 'Error',
    weight: 1,
    color: chalk.red,
  },
  warning: {
    name: 'Warning',
    weight: 2,
    color: chalk.yellow,
  },
  notice: {
    name: 'Notice',
    weight: 3,
    color: chalk.green,
  },
  info: {
    name: 'Info',
    weight: 4,
    color: chalk.blue,
  },
  debug: {
    name: 'Debug',
    weight: 5,
    color: chalk.black.bgBlue,
  },
};

function log(log) {
  const { level, message, description, file, details } = log;
  const date = new Date();

  if (
    process.env.NODE_ENV &&
    ((level.weight > Levels.notice.weight && process.env.NODE_ENV === 'production') ||
      (level.weight > Levels.info.weight && process.env.NODE_ENV !== 'development'))
  )
    return;

  let prefix = level.color(`[${level.name}]`);
  let output = '';
  if (! Array.isArray(message) && message instanceof String) message = [message];
  else if (Array.isArray(message)) {
    if (message.length === 1 && typeof message[0] === 'object') {
      console.log(`${prefix}`, message[0]);
    }
    else output = message.join(' ');
  }
  if (output) console.log(`${prefix} ${output}`);

  // Save logs
}

function debug(message, ...messages) {
  log({
    level: Levels.debug,
    message: [message].concat(messages),
  });
}

function info(message, ...messages) {
  log({
    level: Levels.info,
    message: [message].concat(messages),
  });
}

function notice(message, ...messages) {
  log({
    level: Levels.notice,
    message: [message].concat(messages),
  });
}

function warning(message, ...messages) {
  log({
    level: Levels.warning,
    message: [message].concat(messages),
  });
}

function error(message, ...messages) {
  log({
    level: Levels.error,
    message: [message].concat(messages),
  });
}

function critical(message, ...messages) {
  log({
    level: Levels.critical,
    message: [message].concat(messages),
  });
}

module.exports = { log, debug, info, notice, warning, error, critical };
