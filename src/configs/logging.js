const winston = require('winston')
const path = require('path')
const fs = require('fs')
const cls = require('cls-hooked')

const allFilter = winston.format((info) => info)

const errorFormat = winston.format((info, opts) => {
  if (info.level === 'error' && info.stack) {
    info.message = `${info.message}\n${info.stack}`
    delete info.stack
  }
  return info
})

const createCustomFormat = (module, filter) => {
  const filename = module.replace(/^.*[\\/]/, '')

  return winston.format.combine(
    filter(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json(),
    errorFormat(),
    winston.format.colorize(),
    winston.format.label({ label: filename }),
    winston.format.errors({
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
    winston.format.printf(({ level, message, label, timestamp }) => {
      debugger;
      const clsNamespace = cls.getNamespace('app')
      if (!clsNamespace) {
        return `${timestamp} - ${level.toUpperCase()} - [${label}]: >> ${message}`
      }
      return `${clsNamespace.get('requestId') ? '[Request ID - ' + clsNamespace.get('requestId') + '] - ' : ''}${timestamp} - ${level.toUpperCase()} - [${label}]: >> ${message}`
    })
  )
}

const logger = (module) => {
  const filePath = process.env.LOGGING_DIRECTORY
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath)

  const fileName = path.join(filePath, process.env.LOGGING_FILE)
  const infoFileName = path.join(filePath, process.env.LOGGING_FILE_INFO)
  const errorFileName = path.join(filePath, process.env.LOGGING_FILE_ERROR)
  const actionFileName = path.join(filePath, process.env.LOGGING_FILE_ACTION)

  const myLogger = winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: fileName,
        handleExceptions: true,
        format: createCustomFormat(module, allFilter)
      }),
      new winston.transports.File({
        filename: infoFileName,
        handleExceptions: true,
        format: createCustomFormat(module, allFilter)
      }),
      new winston.transports.File({
        filename: errorFileName,
        handleExceptions: true,
        format: createCustomFormat(module, allFilter)
      }),
      new winston.transports.File({
        filename: actionFileName,
        handleExceptions: true,
        format: createCustomFormat(module, allFilter)
      }),
    ]
  })

  myLogger.logAction = (actionLog) => {
    myLogger.info('[Action logs]: ' + JSON.stringify(actionLog))
  }

  return myLogger
}

module.exports = logger;