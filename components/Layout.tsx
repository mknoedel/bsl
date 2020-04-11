import * as React from 'react'
import Head from 'next/head'
import Footer from './Footer'
import _ from 'lodash'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'BSL',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div style={{minHeight: 'calc(100vh - 60px)', width: "100%"}}>
      {children}
    </div>
    <Footer/>
  </div>
)

export default Layout
