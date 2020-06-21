import * as admin from "firebase-admin";

export const verifyIdToken = (token: string) => {
  // let serviceAccount: any
  // if (process.env.NODE_ENV === 'production') {
  //   serviceAccount = require("../../functions/serviceAccount-production.json");
  // } else {
  //   serviceAccount = require("../../functions/serviceAccount-staging.json");
  // }

  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    console.log('done initializing')
  }

  return admin
    .auth()
    .verifyIdToken(token, true)
    .catch(error => {
      console.log(error)
      throw error;
    });
};
