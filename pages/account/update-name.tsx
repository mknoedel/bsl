import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import Link from "next/link";
import Router from "next/router";
import initFirebase from "../../utils/auth/initFirebase";
import { useUser } from "../../utils/auth/userUser";

initFirebase();

const AccountUpdateName = () => {
  const { user, updateUser } = useUser()
  var input: HTMLInputElement | null = null;

  const handleDisplayNameSubmit = async () => {
    try {
      var curUser = firebase.auth().currentUser;
      if (curUser) {
        await curUser.updateProfile({
          displayName: input?.value || ""
        });
        updateUser({displayName: curUser?.displayName || ""})
      }
      Router.push("/account");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (!user) {
      Router.push("/");
    }
    if (input) {
      input.value = user?.displayName || "";
      input.focus();
    }
  });

  return (
    <>
      {!user?.id ? (
        <></>
      ) : (
        <>
          <p>
            <label htmlFor="displayName">display name: </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              ref={r => (input = r)}
              defaultValue=""
            />
          </p>
          <p>
            <button onClick={handleDisplayNameSubmit}>[ update ]</button>
          </p>
          <p>
            <Link href="/account">
              <a>[ back to account ]</a>
            </Link>
          </p>
        </>
      )}
    </>
  );
};

export default AccountUpdateName
