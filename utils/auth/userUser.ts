import { useEffect, useState } from 'react'
import Router from "next/router"
import cookies from 'js-cookie'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../auth/initFirebase'
import { User } from '../../interfaces'

initFirebase()

const useUser = (): {
  user: User | undefined,
  updateUser: (userUpdate: Partial<User>) => User
  logout: () => Promise<void>
} => {
  const cookie = cookies.get('auth')
  const [user, setUser] = useState<User>(cookie ? JSON.parse(cookie) : undefined)

  const updateUser = (userUpdate: Partial<User>) => {
    const newUser: User = {...user, ...userUpdate}
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
        cookies.remove('auth')
        Router.push('/auth')
      })
  }

  const getFromCookie = async () => {
    const cookie = cookies.get('auth')
    if (!cookie) {
      Router.push('/')
      return
    }
    const parsedCookie = JSON.parse(cookie) 
    if (parsedCookie.error) {
      console.log(`INVALID COOKIE: ${parsedCookie.error}`)
      logout()
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