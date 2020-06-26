import * as React from 'react'
import _ from 'lodash'
import Link from "next/link"

const LoggedOut: React.FunctionComponent<{}> = () => {
  return (
    <div id="loggedOut">
      <p>Hi there!</p>
      <p>
        You are not signed in.{' '}
        <Link href={'/auth'}>
          <a>Sign in</a>
        </Link>
      </p>
    </div>
  )
}

export default LoggedOut
