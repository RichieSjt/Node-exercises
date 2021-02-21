const chalk = require('chalk')
const getNotes = require('./notes.js')

const msg = getNotes()
console.log(msg)

console.log(chalk.red.bold('Error!'))
console.log(chalk.green.bold('Success!'))