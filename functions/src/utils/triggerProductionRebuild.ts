import * as functions from "firebase-functions"
const request = require('request');

export function triggerPoductionRebuild() {
    const environment = functions.config().app.environment
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