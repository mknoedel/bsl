import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
const request = require('request');

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


/**
 * Gets the cloud function environment 
 */
export const getEnvironment = functions.https.onCall(async () => {
  return { environment: environment };
});


function triggerPoductionRebuild() {
  if (environment === "production") {
    console.log(`A Tab has changed, redeploy Production...`);
    const options = {
      url: 'https://api.vercel.com/v1/integrations/deploy/QmauP4xPvQjCKhUkuEhF5n4shqv6AchaaLvYEQzXi2z7NS/oj4zZtiJuP',
      method: 'POST'
    };

    function callback(error: any, response: any, body: any) {
      if (error) {
        console.error("Rebuild error:", error)
      } else {
        console.log('Rebuild status code: ' + response.statusCode);
        console.log('Rebuild response: ' + body);
      }
    }
    request(options, callback);
  } else {
    console.log("Only deploy production if in a production")
  }

}

/**
 * Triggered by any change to a Firestore Tabs Collection.
 * Redeploys the production build.
 */
export const triggerRedeploy = functions.firestore
  .document('Builds/{id}')
  .onCreate(triggerPoductionRebuild)
