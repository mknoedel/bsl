import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import Link from "next/link";
import initFirebase from "../utils/auth/initFirebase";
import Router from "next/router";
import { useUser } from "../utils/auth/userUser";

const Account = (props: {
  environment: string
}) => {
  const { environment } = props
  const { user, logout } = useUser()

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

export async function getStaticProps() {
  initFirebase()
  const getEnvironment = firebase.functions().httpsCallable("getEnvironment")
  const result = await getEnvironment({})
  return {
    props: {
      environment: result.data.environment
    }
  }
}

// Account.getInitialProps = async function() {
//   const getEnvironment = firebase.functions().httpsCallable("getEnvironment");
//   const result = await getEnvironment({});
//   return {
//     environment: result.data.environment
//   };
// };

export default Account;
