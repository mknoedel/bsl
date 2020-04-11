import * as React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Hidden, Box } from '@material-ui/core'
import HorizontalNonLinearAlternativeLabelStepper from '../components/Stepper'
import tabs from '../utils/tabs'

const IndexPage: NextPage = () => {
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
    </Layout>
  )
}

export default IndexPage
