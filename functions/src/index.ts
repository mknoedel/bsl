import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

let serviceAccount: any;
let storageBucket: string = "";
const environment = functions.config().app.environment;
if (environment === "staging") {
  serviceAccount = require("../serviceAccount-staging.json");
  storageBucket = "bsl-balance-staging.appspot.com";
} else if (environment === "production") {
  serviceAccount = require("../serviceAccount-production.json");
  storageBucket = "bsl-balance.appspot.com";
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: storageBucket
});

export const getEnvironment = functions.https.onCall(async () => {
  return { environment: environment };
});
