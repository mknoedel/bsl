import * as admin from "firebase-admin";

export const verifyIdToken = (token: string) => {
  const serviceAccount = require("../../functions/serviceAccount-staging.json");
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
