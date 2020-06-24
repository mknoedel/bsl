import * as React from 'react'
import { NextPageContext } from 'next'
import Layout from '../../components/Layout'
import { fetcher } from '../../utils/fetcher'
import DiscreteSlider from '../../components/DiscreteSlider'
import _ from 'lodash'
import { Grid, Typography, makeStyles, Hidden, Container } from '@material-ui/core'
import { ITab, IForm } from '../../interfaces'
import getRating from '../../utils/getRating'
import VerticalLinearStepper from '../../components/VertStepper'
import HorizontalNonLinearAlternativeLabelStepper from '../../components/Stepper'
import tabs from '../../utils/tabs'
import TabGauge from '../../components/TabGauge'
import { getApiUrl } from '../../utils/getApiUrl'


type Props = {
  tab: ITab
  errors?: string
}

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

const TabDetail = ({tab, errors}: Props) => {
  console.log(tab, errors)

  if (errors || !tab) {
    return (
      <Layout title={`Error`}>
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors || 'Something went wrong.'}
        </p>
      </Layout>
    )
  }

  const classes = useStyles()
  const [form, setForm] = React.useState(tab.questions);

  React.useEffect(() => {
    let storedTab: string = localStorage.getItem(tab?.name) || ''
    if (storedTab)
      setForm(JSON.parse(storedTab))
  }, [])

  const setValue = (value: number, index: number) => {
    let newForm = _.clone(form)
    if (!newForm) {
      throw new Error('unable to update form')
    }
    newForm[index].value = value
    setForm(newForm)
    localStorage.setItem(tab?.name, JSON.stringify(newForm))
  }

  let rating = getRating(form)

  return (
    <Layout title={tab.name}>
      <HorizontalNonLinearAlternativeLabelStepper tabs={tabs}>
        <Container maxWidth="lg">
          <br />
          <Grid container spacing={1} id="tab-content">

            <Grid item md={12}>
              <Typography className={classes.title}>{tab?.name}</Typography>
            </Grid>

            <Hidden smDown>
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

            <Hidden smDown>
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
TabDetail.getInitialProps = async ({ query, req }: NextPageContext) => {
  try {

    const { id } = query
    const url = `/api/tabs/${Array.isArray(id) ? id[0] : id}`

    const response: {data: ITab, message?: string} = await fetcher(getApiUrl(url, req))
    if (!response?.data?.questions) {
      throw new Error(response.message)
    }
    
    return { tab: response.data }
  } catch (err) {
    return { errors: err.message }
  }
}

export default TabDetail
