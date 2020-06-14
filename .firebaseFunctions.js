const { join } = require('path')
import * as admin from "firebase-admin";
const { https } = require('firebase-functions')
const { default: next } = require('next')

admin.initializeApp();

const isDev = process.env.NODE_ENV !== 'production'
const nextjsDistDir = join('src', require('./src/client/next.config.js/index.js').distDir)

const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir,
  },
})
const nextjsHandle = nextjsServer.getRequestHandler()

exports.nextjsFunc = https.onRequest((req, res) => {
  // log the page.js file or resource being requested
  console.log("File: " + request.originalUrl);
  return nextjsServer.prepare().then(() => nextjsHandle(req, res))
})