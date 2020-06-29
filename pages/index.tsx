import * as React from 'react'
import Layout from '../components/Layout'
import { Hidden, Box } from '@material-ui/core'
import HorizontalNonLinearAlternativeLabelStepper from '../components/Stepper'
import { ITab } from '../interfaces'
import * as firebase from 'firebase';
import 'firebase/firestore';
import initFirebase from '../utils/auth/initFirebase'
// import { useUser } from '../utils/auth/userUser'
// import LoggedIn from '../components/LoggedIn'
// import LoggedOut from '../components/LoggedOut'


const IndexPage = (props: {
  tabs: ITab[]
}) => {
  const { tabs } = props
  // const { user, logout } = useUser()

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

      {/* {!user?.id ? (
        <LoggedOut/>
      ) : (
        <LoggedIn
          user={user}
          logout={logout}
        />
      )} */}
    </Layout>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  initFirebase()
  const snapshot = await firebase.firestore().collection("Tabs").get()
  return {
    props: {
      tabs: snapshot.docs.map(doc => doc.data())
    }
  }
}

export default IndexPage
