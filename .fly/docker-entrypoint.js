#!/usr/bin/env node

import { spawn } from 'node:child_process'

const env = { ...process.env }

try {
  env.PG_HOST = process.env.DB_HOST
  env.PG_PORT = process.env.DB_PORT
  env.PG_USER = process.env.DB_USER
  env.PG_PASSWORD = process.env.DB_PASSWORD
  env.PG_DB_NAME = process.env.DB_DATABASE
  // The connection string used by fly.io
  env.DATABASE_URL = `postgres://${env.PG_USER}:${env.PG_PASSWORD}@${env.PG_HOST}:${env.PG_PORT}/${env.PG_DB_NAME}`
} catch (err) {
  console.error('Invalid DATABASE credentials')
}

;(async () => {
  // launch application
  await exec(process.argv.slice(2).join(' '))
})()

function exec(command) {
  const child = spawn(command, { shell: true, stdio: 'inherit', env })
  return new Promise((resolve, reject) => {
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${command} failed rc=${code}`))
      }
    })
  })
}
