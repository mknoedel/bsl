// From:
// https://github.com/zeit/next.js/blob/canary/examples/with-firebase-authentication/pages/index.js

import fetch from "isomorphic-unfetch"
import logout from "../../utils/auth/logout"


export const setSession = async (user: firebase.User | null) => {

  const token = await user?.getIdToken()
  // Log in.
  if (token) {

      const response = await fetch("/api/login", {
        method: "POST",
        // eslint-disable-next-line no-undef
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ token })
      })
      if (response.ok) {
        return response
      } else {
        await logout()
        return
      }

  }

  // Log out.
  logout()
  return fetch("/api/logout", {
    method: "POST",
    credentials: "same-origin"
  });
};
