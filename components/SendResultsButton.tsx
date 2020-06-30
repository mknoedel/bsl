import React, { useState } from 'react'
import { Button } from "@material-ui/core"
import firebase from "firebase/app"
import initFirebase from "../utils/auth/initFirebase"
import { useUser } from "../utils/auth/userUser"
import { Scores } from '../interfaces'

initFirebase()

function formatToday() {
    const date = new Date()
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
    const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date)
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
    return `${year}-${month}-${day}`
}

const SendResultsButton = (props: {scores: Scores[]}) => {
    const { scores } = props
    const { user } = useUser()
    const [buttonText, setButtonText] = useState("Send Results")
    const [disabled, setDisabled] = useState(false)

    return (
        <Button
            style={{justifyContent: 'center'}}
            variant="contained"
            color="primary"
            disabled={disabled}
            onClick={async () => {
                try {
                    setDisabled(true)
                    if (!user?.id) {
                        alert("You are not logged in. Please login to send results.")
                        return false
                    }
                    const date = formatToday()
                    const db = firebase.firestore();
                    const cityRef = db.collection('Scores').doc(`${user.id}${date}`);
    
                    await cityRef.set({
                        uid: user.id,
                        date,
                        scores
                    }, { merge: true });
    
                    setButtonText("Results Sent")
                    return true
                } catch (e) {
                    console.error(e)
                    setDisabled(false)
                    alert("Unable to send results at this time. Please try again later.")
                }
            }}
        > {buttonText}
        </Button>
    )
}
    
  export default SendResultsButton