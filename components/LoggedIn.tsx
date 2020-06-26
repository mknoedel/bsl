import * as React from 'react'
import _ from 'lodash'
import { User } from '../interfaces'
import Link from "next/link"
import fetcher from '../utils/fetcher'
import useSWR from 'swr'

type Props = {
  user: User,
  logout: () => void
}

const LoggedIn: React.FunctionComponent<Props> = ({ user, logout }) => {
  const { data, error } = useSWR<any>(
    user ? ['/api/getFood', user.token] : null,
    fetcher
  )
  // All these suppressHydrationWarnings are because the server does not have access to the Auth Information during server-side rendering.
  // The server will never match the client if the user is logged in so this is ok to suppress.
  return (
    <div suppressHydrationWarning={true}>
      <div suppressHydrationWarning={true}>
        <p suppressHydrationWarning={true}>You're signed in. Email: {user.email}</p>
        <p suppressHydrationWarning={true}>Display Name: {user.displayName}</p>
        <p
          suppressHydrationWarning={true}
          style={{
            display: 'inlinelock',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={logout}
        >
          Log out
        </p>
      </div>
      <div>
        <Link href={'/spaces'}>
          <a>[ Spaces ]</a>
        </Link>
        <Link href={'/account'}>
          <a>[ Account Management ]</a>
        </Link>
      </div>
      {error && <div>Failed to fetch food!</div>}
      {data && <div>Your favorite food is {data.food}.</div>}
    </div>
  )
}

export default LoggedIn
