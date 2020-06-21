import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Hidden, Box } from '@material-ui/core'
import HorizontalNonLinearAlternativeLabelStepper from '../components/Stepper'
import tabs from '../utils/tabs'
import Link from "next/link"
import { useUser } from '../utils/auth/userUser'
import useSWR from 'swr'

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const IndexPage: NextPage = () => {
  const { user, logout } = useUser()
  const { data, error } = useSWR(
    user ? ['/api/getFood', user.token] : null,
    fetcher
  )

  return (
    <Layout title='Home'>
      <HorizontalNonLinearAlternativeLabelStepper tabs={tabs}>
        <Box 
          display="flex" 
          width={'100%'}
          alignItems="center"
          justifyContent="center"
        >
          <Hidden smDown>
            <img src='BSL circle logo.png' height="500px" style={{margin: '50px'}}/>
          </Hidden>
            <Hidden mdUp>
              <img src='BSL circle logo.png' width='100%' style={{margin: '50px'}}/>
          </Hidden>
        </Box>
      </HorizontalNonLinearAlternativeLabelStepper>

      {!user?.id ? (
          <>
          <p>Hi there!</p>
          <p>
            You are not signed in.{' '}
            <Link href={'/auth'}>
              <a>Sign in</a>
            </Link>
          </p>
        </>
      ) : (
        <div>
          <div>
            <p>You're signed in. Email: {user.email}</p>
            <p>Display Name: {user.displayName}</p>
            <p
              style={{
                display: 'inlinelock',
                color: 'blue',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => logout()}
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
      )}
    </Layout>
  )
}

export default IndexPage
