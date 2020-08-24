import * as React from 'react'
import Footer from './Footer'
import _ from 'lodash'
import { useReducer } from 'react'
import { SnackbarReducer, SnackContext, SnackbarWrapper } from './Snackbar'
import { SnackState, SnackAction } from '../interfaces'


const Layout = (props: {children: any, title?: string}) => {
  const [snackState, dispatchSnacks] = useReducer<React.Reducer<SnackState, SnackAction>>(SnackbarReducer, {open: false, snackPack: []})

  return (
    <SnackContext.Provider value={dispatchSnacks}>
      <title>{props.title}</title>
      <div style={{minHeight: 'calc(100vh - 60px)', width: "100%"}}>
        {props.children}
      </div>
      <Footer/>
      <SnackbarWrapper snackState={snackState} />
    </SnackContext.Provider>
  )
}

export default Layout
