import * as React from 'react'
import Layout from '../components/Layout'
import { Hidden, Box } from '@material-ui/core'
import HorizontalNonLinearAlternativeLabelStepper from '../components/Stepper'
import Link from "next/link"
import { useUser } from '../utils/auth/userUser'
import useSWR from 'swr'
import { ITab } from '../interfaces'
import * as firebase from 'firebase';
import 'firebase/firestore';
import initFirebase from '../utils/auth/initFirebase'


const swrFetcher = (url: string, token: string) => {
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())
}

type Props = {
  tabs: ITab[]
  errors?: string
}

const IndexPage = ({tabs, errors}: Props) => {
  console.log({tabs})
  const { user, logout } = useUser()
  const { data, error } = useSWR<any>(
    user ? ['/api/getFood', user.token] : null,
    swrFetcher
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

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  initFirebase()
  const snapshot = await firebase.firestore().collection("Tabs").get()
  console.log(snapshot.docs.map(doc => doc.data()))
  return {
    props: {
      tabs: snapshot.docs.map(doc => doc.data())
    },
  }
}

// Can use if we have server-side Auth //
// IndexPage.getInitialProps = async ({ req }: NextPageContext) => {
//   JSON.parse(cookie)
//   const db = firebase.firestore();
//   const ref = db.collection("Spaces").doc(id);
//   let form = ref.get()
//     .then(doc => {
//       if (!doc.exists) {
//         console.log('No such document!');
//       } else {
//         console.log('Document data:', doc.data());
//       }
//     })
//     .catch(err => {
//       console.log('Error getting document', err);
//     })
// }

export default IndexPage
