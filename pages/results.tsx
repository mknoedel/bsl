import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout'
import _ from 'lodash';
import { Grid, Hidden, Typography, Container } from '@material-ui/core';
import ResultsChart from '../components/ResultsChart';
import PrintButton from '../components/PrintButton';
import ResultsChartMobile from '../components/ResultsChartMobile';
import HorizontalNonLinearAlternativeLabelStepper from '../components/Stepper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import initFirebase from '../utils/auth/initFirebase'
import { ITab } from '../interfaces';
import { useUser } from '../utils/auth/userUser';

const useStyles = makeStyles((theme) => ({
  graph: {
    minWidth: 200,
    maxWidth: 1280,
    marginLeft: theme.spacing(0),
    width: '100%',
  },
  title: {
    fontSize: "30px",
    marginLeft: theme.spacing(0),
  },
}))

const ResultsPage = (props: {
  tabs: ITab[]
}) => {
  const { tabs } = props
  const { user } = useUser()
  const classes = useStyles();

  return (
    <Layout title="Results" >

      <HorizontalNonLinearAlternativeLabelStepper tabs={props.tabs}>
        <Container maxWidth="lg">

        <Hidden smDown>
         <Grid container >
            <img src='BSL circle logo.png' height="40px"/>
  <Typography className={classes.title}>{user ? `${user.displayName}'s` : null} Results</Typography>
            <ResultsChart tabs={tabs}/>
          </Grid>
        </Hidden>

          <Hidden mdUp>
            <Grid container>
              <img src='BSL circle logo.png' height="40px" style={{marginTop:"8px"}}/>
              <Typography className={classes.title}>{user ? `${user.displayName}'s` : null} Results</Typography>
              <div className={classes.graph}>
                <ResultsChartMobile tabs={tabs}/>
              </div>
            </Grid>
          </Hidden>

          <br />

          <Hidden mdUp>
            <PrintButton mobileMode={true}/>
          </Hidden>
          <Hidden smDown>
            <PrintButton/>
          </Hidden>
          
        </Container>
      </HorizontalNonLinearAlternativeLabelStepper>

    </Layout>
  )
}

export async function getStaticProps() {
  initFirebase()
  const snapshot = await firebase.firestore().collection("Tabs").get()
  return {
    props: {
      tabs: snapshot.docs.map(doc => doc.data())
    }
  }
}

export default ResultsPage
