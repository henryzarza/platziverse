const debug = require('debug')('platziverse:db:setup')

module.exports = function (init = true) {
  return {
    database: process.env.DB_NAME || 'platziverse',
    usermane: process.env.DB_USER || 'henryzarza',
    password: process.env.DB_PASS || '1234',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: init
  }
}
