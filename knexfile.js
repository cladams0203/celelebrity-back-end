// Update with your config settings.
require('dotenv').config()
const pg = require('pg')
// pg.defaults.ssl=true
// console.dir(process.env)
module.exports = {

  development: {
    client: 'pg',
    connection: {
          host: 'localhost',
          port: 5432,
          user: 'postgres',
          password: 'mustang85',
          database: 'celebritydead'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: ':memory:' 
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'postgres'
},
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
