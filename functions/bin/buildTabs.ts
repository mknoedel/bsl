#!/usr/bin/env ts-node-script
import tabs from './tabs'
import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

var ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Add default tabs to a project\'s Firestore'
});
parser.addArgument(
  'env',
  {
    help: 'Firebase project database environment.',
    choices: ['staging', 'production']
  }
)

let serviceAccount: any;
const environment = parser.parseArgs().env || functions.config().app.environment;
if (environment === "staging") {
  serviceAccount = require("../serviceAccount-staging.json");
} else if (environment === "production") {
  serviceAccount = require("../serviceAccount-production.json");
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log(`Building Tabs for ${environment}`)

async function createTab(tab: any) {
  const db = admin.firestore();
  const ref = db.collection("Tabs").doc(tab.name);
  const snap = await ref.get();
  if (snap.exists) {
      throw new Error(`a tab with that ID already exists`);
  }
  await ref.set(tab)
}

for (const tab of tabs) {
    try {
      createTab(tab)
    } catch (e) {
      console.error(e)
    }
}
