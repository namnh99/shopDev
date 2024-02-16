const fs = require('fs')

// console.log(fs.readFileSync('logs/test_info.log.2024-02-16', { encoding: 'utf8', flag: 'r' }))

// fs.unlink('logs/info.log.2024-02-16', (err) => {
//   console.log(err)
// })

console.log(fs.accessSync('logs/test_info.log.2024-02-16', fs.constants.R_OK | fs.constants.W_OK))