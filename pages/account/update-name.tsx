import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import Link from "next/link";
import initFirebase from "../../utils/auth/initFirebase";
import { useUser } from "../../utils/auth/userUser";
import Layout from "../../components/Layout";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { snack, SnackContext } from "../../components/Snackbar";
import { User } from "../../interfaces";

initFirebase();

const AccountUpdateName = () => {
  const { user, updateUser } = useUser()

  return (
    <Layout>
      {!user?.id ? (
        <></>
      ) : (
        <Container>
          <Typography style={{fontSize: "30px", marginTop: '50px'}}>Account Management</Typography>


          <TextField
            id="email"
            label="Email"
            defaultValue={user.email}
            InputProps={{
              readOnly: true,
            }}
          />

          <DisplayName displayName={user.displayName} updateUser={updateUser}/>

          <Link href="/">
            <a>Back to Home</a>
          </Link>

        </Container>
      )}
    </Layout>
  );
};

export default AccountUpdateName


const DisplayName = (props: {displayName: string, updateUser: (userUpdate: Partial<User>) => User}) => {
  const dispatch = useContext(SnackContext)
  const [displayName, setDisplayName] = useState(props.displayName)

  const handleDisplayNameSubmit = async () => {
    try {
      var curUser = firebase.auth().currentUser;
      if (curUser) {
        await curUser.updateProfile({
          displayName: displayName || ""
        });
        props.updateUser({displayName: displayName || ""})
        snack(dispatch, `Name successfully updated`, 'success')
      }
    } catch (error) {
      snack(dispatch, `Error`, 'error')
    }
  }

  return (
    <p style={{display: 'flex', alignItems: 'baseline'}}>
      <TextField
        id="displayName"
        label="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <Button onClick={handleDisplayNameSubmit}>[ update ]</Button>
    </p>
  )
}