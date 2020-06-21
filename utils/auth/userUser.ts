import { useEffect, useState } from 'react'
import Router from "next/router"
import cookies from 'js-cookie'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../auth/initFirebase'
import { UserData } from '../../interfaces'

initFirebase()

const useUser = (): {
  user: UserData | undefined,
  updateUser: (userUpdate: Partial<UserData>) => UserData
  logout: () => Promise<void>
} => {
  const cookie = cookies.get('auth')
  const [user, setUser] = useState<UserData>(cookie ? JSON.parse(cookie) : undefined)

  const updateUser = (userUpdate: Partial<UserData>) => {
    const newUser: UserData = {...user, ...userUpdate}
    cookies.set('auth', newUser)
    setUser({...user, ...userUpdate})
    return newUser
  }

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        cookies.remove('auth')
        Router.push('/auth')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const getFromCookie = () => {
    const cookie = cookies.get('auth')
    if (!cookie) {
      Router.push('/')
      return
    }
    const parsedCookie = JSON.parse(cookie) 
    if (parsedCookie.error) {
      console.log(parsedCookie.error)
      Router.push('/')
      return
    }
    setUser(JSON.parse(cookie))
  }

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(getFromCookie)
  }, [])

  return { user, updateUser, logout }
}

export { useUser }