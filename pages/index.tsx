import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Hidden, Box } from '@material-ui/core'
import HorizontalNonLinearAlternativeLabelStepper from '../components/Stepper'
import tabs from '../utils/tabs'
import { get } from "lodash"
import PropTypes from "prop-types"
import Link from "next/link"
import Footer from '../components/FakeFooter'
import Header from '../components/FakeHeader'

const IndexPage: NextPage = (props: any) => {
  const { AuthUserInfo } = props
  const authUser = get(AuthUserInfo, "AuthUser")

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

    <>
      <Header />
      {!authUser ? (
        <>
          <div>not signed in.</div>
          <div>
            <Link href={"/login"}>
              <a>[ log in ]</a>
            </Link>
          </div>
          <p>
            <Link href={"/signup"}>
              <a>[ create account ]</a>
            </Link>
          </p>
        </>
      ) : (
        <>
          <pre className="text-xs">{JSON.stringify(authUser, null, 2)}</pre>
          <p>
            <Link href={"/account"}>
              <a>[ account ]</a>
            </Link>
          </p>
          <p>
            <Link href={"/spaces"}>
              <a>[ spaces ]</a>
            </Link>
          </p>
        </>
      )}
      <>
        <Footer />
      </>
    </>

    </Layout>
  )
}

IndexPage.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired
    }),
    token: PropTypes.string
  })
};

IndexPage.defaultProps = {
  AuthUserInfo: null
};

export default IndexPage
