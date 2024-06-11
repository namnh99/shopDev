const winston = require('winston')
require('winston-daily-rotate-file')
const path = require('path')
const fs = require('fs')
const { combine, timestamp, json, colorize, label, errors, printf } = winston.format

const allFilter = winston.format(info => info)

const infoFilter = winston.format(info => info.level === 'info' ? info : false)

const errorFilter = winston.format(info => info.level === 'error' ? info : false)

const actionFilter = winston.format(info => {
  if (!info.message || typeof info.message !== 'string') return false
  return info.message.includes('[Action logs]') ? info : false
})

const errorFormat = winston.format((info) => {
  if (info.level === 'error' && info.stack) {
    info.message = `${info.message}\n${info.stack}`
    delete info.stack
  }
  return info
})

const createCustomFormat = (module, filter) => {
  const filename = module.replace(/^.*[\\/]/, '')

  return combine(
    filter(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json(),
    errorFormat(),
    colorize(),
    label({ label: filename }),
    errors({
      stack: true,
      separator: '\n',
      showStack: true,
      depth: 10,
      message: true,
      stacktrace: true,
      code: true,
      signal: true,
      name: true,
      date: true,
      trace: true
    }),
    printf(({ level, message, label, timestamp }) => {
      return `${timestamp} - [${label}]: >> ${message}`
    })
  )
}

const createTransportItem = (fileName, module, filter) => {
  return new winston.transports.DailyRotateFile({
    filename: `${fileName}.%DATE%`,
    handleExceptions: true,
    zippedArchive: true,
    datePattern: 'YYYY-MM-DD',
    format: createCustomFormat(module, filter),
    // auditFile: `${fileName}-audit.json`,
    maxSize: '20m',
    maxFiles: '1d',
  })
}

const logger = (module) => {
  const filePath = process.env.LOGGING_DIRECTORY
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath)

  const fileName = path.join(filePath, process.env.LOGGING_FILE)
  const infoFileName = path.join(filePath, process.env.LOGGING_FILE_INFO)
  const errorFileName = path.join(filePath, process.env.LOGGING_FILE_ERROR)
  const actionFileName = path.join(filePath, process.env.LOGGING_FILE_ACTION)

  const transportsAll = createTransportItem(fileName, module, allFilter)
  const transportsInfo = createTransportItem(infoFileName, module, infoFilter)
  const transportsError = createTransportItem(errorFileName, module, errorFilter)
  const transportsAction = createTransportItem(actionFileName, module, actionFilter)

  // // handle when rotate file log
  // transportsAll.on('rotate', (oldFile, newFile) => {
  //   console.log(oldFile)
  // });

  const myLogger = winston.createLogger({
    transports: [
      transportsAll,
      transportsInfo,
      transportsError,
      transportsAction,
    ]
  })

  // add log console if running dev/test env
  if (process.env.APP_ENV !== 'production') {
    myLogger.add(new winston.transports.Console({
      handleExceptions: true,
      format: createCustomFormat(module, errorFilter)
    }))
  }

  myLogger.action = (actionLog) => {
    myLogger.info('[Action logs]: ' + JSON.stringify(actionLog))
  }

  return myLogger
}

module.exports = logger;