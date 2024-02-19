const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const logger = require('../configs/logging')(module.filename)

const INTERVEL_TIMES = 5000

// count connection
const countConnect = () => {
  const numConnection = mongoose.connections.length
  // logger.info(`Number of connections: ${numConnection}`)
  return numConnection
}

// check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnection = countConnect()
    const numCores = os.cpus().length
    const memoriesUsage = process.memoryUsage().rss;

    logger.info(`Active Connection: ${numConnection}`)
    logger.info(`Memories Usage: ${memoriesUsage / 1024 / 1024} MB`)

    const maxConnections = numCores * 5;

    if (numConnection > maxConnections) {
      logger.info('Connection Overload Detected!')
      // notifycation send warning
    }

  }, INTERVEL_TIMES)
}

module.exports = {
  countConnect,
  checkOverload
}