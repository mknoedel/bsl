import * as React from 'react'
import Layout from '../../components/Layout'
import DiscreteSlider from '../../components/DiscreteSlider'
import _ from 'lodash'
import { Grid, Typography, makeStyles, Hidden, Container } from '@material-ui/core'
import { ITab, IField, IForm } from '../../interfaces'
import getRating from '../../utils/getRating'
import VerticalLinearStepper from '../../components/VertStepper'
import HorizontalNonLinearAlternativeLabelStepper from '../../components/Stepper'
import TabGauge from '../../components/TabGauge'
import { useRouter, NextRouter } from 'next/router'
import * as firebase from 'firebase';
import 'firebase/firestore';
import initFirebase from '../../utils/auth/initFirebase'
import getTabLink from '../../utils/getTabLink'

initFirebase()

const useStyles = makeStyles(theme => ({
  question: {
    weight: 500,
    fontSize: "14px",
  },
  averageDescripton: {
    fontSize: "10px",
  },
  averageValue: {
    fontSize: "40px",
  },
  title: {
    fontSize: "30px",
    marginLeft: theme.spacing(0),
  }
}));

function getTab(tabs: ITab[], router: NextRouter): ITab {
  return _.find(tabs, tab => getTabLink(tab.name) === router.asPath) || {name: "Loading..."}
}

const TabDetail = (props: {
  tabs: ITab[]
}) => {
  const { tabs } = props
  const router = useRouter()
  const [tab, setTab] = React.useState<ITab>(getTab(props.tabs, router))

  if (!tab) {
    return (
      <Layout title={`Error`}>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {'Something went wrong.'}
        </p>
      </Layout>
    )
  }

  const classes = useStyles()
  const [form, setForm] = React.useState<IForm>(tab.questions || [])
  const [rating, setRating] = React.useState<number>(0)
  const [loading, setLoading] = React.useState(false);


  React.useEffect(() => {
    setTab(getTab(props.tabs, router))
  },[router.asPath])

  React.useEffect(() => {
    const _form = tab.questions || []
    let storedTab: IForm = JSON.parse(localStorage.getItem(tab?.name) || '[]')
    if (storedTab) {
      setForm(_form.map((question: IField) => {
        question.value = storedTab.find(c => c.question === question.question)?.value || 0
        return question
      }))
    }
    setLoading(false)
  }, [tab])

  React.useEffect(() => {
    setRating(getRating(form))
  }, [form])

  const setValue = (value: number, index: number) => {
    let newForm = _.clone(form)
    if (!newForm) {
      throw new Error('unable to update form')
    }
    newForm[index].value = value
    setForm(newForm)
    localStorage.setItem(tab?.name, JSON.stringify(newForm))
  }

  return (
    <Layout title={tab.name}>
      <HorizontalNonLinearAlternativeLabelStepper tabs={tabs} loading={loading} setLoading={setLoading}>
        <Container maxWidth="lg">
          <br />
          <Grid container spacing={1} id="tab-content">

            <Grid item md={12}>
              <Typography className={classes.title}>{tab?.name}</Typography>
            </Grid>

            {/* <Grid container spacing={1} id="questions-container"> */}
              <Hidden smDown initialWidth={'lg'}>
                {_.map(form, (field, idx) => {
                  return (
                    <Grid item md={4} xs={12} key={idx}>
                      <Typography className={classes.question}>
                        {field.question}
                      </Typography>
                      <br />
                      <DiscreteSlider field={field} idx={idx} setValue={setValue} valueDisplay={true}/>
                    </Grid>
                  )
                })}
              </Hidden>
            {/* </Grid> */}

            <Hidden mdUp>
              <VerticalLinearStepper form={form} setValue={setValue}/>
            </Hidden>

            <Grid item md={4} xs={12}>
              <Typography className={classes.averageValue} display="inline">
                {rating}
              </Typography>
              <Typography className={classes.averageDescripton}>
                {'(Score/# of ?\'s)  '}
              </Typography>
            </Grid>

            <Hidden smDown initialWidth={'lg'}>
              <Grid item md={12}>
                <TabGauge score={rating}/> 
              </Grid>
            </Hidden>

          </Grid>
        </Container>
      </HorizontalNonLinearAlternativeLabelStepper>
    </Layout>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  const snapshot = await firebase.firestore().collection("Tabs").get()
  // Get the paths we want to pre-render based on posts
  const paths = snapshot.docs.map(doc => ({
    params: { id: _.kebabCase(doc.data().name) },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps() {
  const snapshot = await firebase.firestore().collection("Tabs").get()
  return {
    props: {
      tabs: snapshot.docs.map(doc => doc.data())
    }
  }
}

export default TabDetail
