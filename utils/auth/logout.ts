import Router from "next/router"
import cookies from 'js-cookie'
import firebase from 'firebase/app'
import 'firebase/auth'

export default async function () {
  await firebase
    .auth()
    .signOut()
    .then(() => {
      cookies.remove('auth')
    })
    .catch((e) => {
      console.error(e)
      cookies.remove('auth')
    })
  Router.reload()
  return
}
