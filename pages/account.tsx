import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import Link from "next/link";
import initFirebase from "../utils/auth/initFirebase";
import Router from "next/router";
import { useUser } from "../utils/auth/userUser";

initFirebase();

const Account = (props: any) => {
  const { user, logout } = useUser()
  const { environment } = props;

  return (
    <>
      {!user?.id ? (
        <></>
      ) : (
        <>
          <div>
            <label htmlFor="displayName">display name</label>{" "}
            <Link href="/account/update-name">
              <a>[ update ]</a>
            </Link>
            <p>{user.displayName}</p>
          </div>
          <p>{`env: ${environment}`}</p>
          <p>
            <button
              onClick={async () => {
                try {
                  await logout();
                  Router.push("/auth");
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              [ log out ]
            </button>
          </p>
        </>
      )}
    </>
  );
};

Account.getInitialProps = async function() {
  const getEnvironment = firebase.functions().httpsCallable("getEnvironment");
  const result = await getEnvironment({});
  return {
    environment: result.data.environment
  };
};

export default Account;
