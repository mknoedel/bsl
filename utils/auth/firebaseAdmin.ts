import * as admin from "firebase-admin";

export const verifyIdToken = (token: string) => {

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
      console.error(error)
      throw error;
    });
};
