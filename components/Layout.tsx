import * as React from 'react'
import Footer from './Footer'
import _ from 'lodash'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({children}) => {
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 60px)', width: "100%"}}>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
