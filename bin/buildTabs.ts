#!/usr/bin/env ts-node-script
import tabs from '../utils/tabs'
import createTab from '../utils/generateData/createTab'
import * as path from 'path'

require("dotenv").config({ path: path.join(process.cwd(), '../.env.build')});
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
console.log({config})

for (const tab of tabs) {
    try {
        createTab(tab)
    } catch (e) {
        console.error(e)
    }
}