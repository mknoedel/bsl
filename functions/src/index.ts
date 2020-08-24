import * as functions from "firebase-functions"
import { triggerPoductionRebuild } from "./utils/triggerProductionRebuild"
import { initializeApp } from "./utils/initializeApp"

initializeApp()

/**
 * Gets the cloud function environment 
 */
export const getEnvironment = functions.https.onCall(async () => {
  return { environment: functions.config().app.environment }
})


/**
 * Redeploys the production build on any change to a Firestore Tabs Collection.
 */
export const triggerRedeploy = functions.firestore
  .document('Builds/{id}')
  .onCreate(triggerPoductionRebuild)
