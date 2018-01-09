'use strict'

const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()
async function setup () {
  const existFlag = process.argv.findIndex(element => element === 'yes') // yes is the flag
  if (existFlag === -1) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])
  
    if (!answer.setup) {
      return console.log('Nothing happened :D')
    }
  }

  const config = require('./config-db')()

  await db(config).catch(handleFatalError)

  console.log('success!')
  process.exit(0)
}

function handleFatalError (error) {
  console.error(`${chalk.red('[fatal error]')} ${error.message}`)
  console.error(error.stack)
  process.exit(1)
}

setup()
