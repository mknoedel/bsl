import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ITab } from '../interfaces';
import { useRouter } from 'next/router'
import _ from 'lodash';
import { Hidden, Container, LinearProgress } from '@material-ui/core';
import getTabLink from '../utils/getTabLink';
import BeginButton from './BeginButton';
import tabPath from '../utils/tabPath';
import resultsPath from '../utils/resultsPath';

interface IButtonProps {
    optional?: any,
}
interface ISetProps {
    completed?: boolean
}
interface Props {
  tabs: ITab[]
  children: any,
  loading?: boolean,
  setLoading?: (state: boolean) => void
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: "30px",
    marginLeft: theme.spacing(10),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
}));


export default function HorizontalNonLinearAlternativeLabelStepper(props: Props) {
  const { tabs, loading = false, setLoading = _.noop } = props
  const classes = useStyles()
  const router = useRouter()
  let initialStep = _.findIndex(tabs, tab => getTabLink(tab.name) === router.asPath)


  // States
  const [activeStep, setActiveStep] = React.useState(initialStep);
  const [completed, setCompleted] = React.useState(new Array());
  const [skipped, setSkipped] = React.useState(new Array());
  // Initialize with localStorage
  useEffect(() => {
    setCompleted(JSON.parse(localStorage.getItem('completed') || '[]'))
    setSkipped(JSON.parse(localStorage.getItem('skipped') || '[]'))
    return
  }, []) 




  useEffect(() => {
    let tabName = getTabName(activeStep)
    if (tabName && router.asPath !== getTabLink(tabName)) {
      setLoading(true)
      const tabLink = getTabLink(tabName)
      router.push(tabName ? `${tabPath}/[id]` : "/", tabLink)
    }
  }, [activeStep])
  // Store changes in localStorage
  useEffect(() => localStorage.setItem('completed', JSON.stringify(completed)), [completed])
  useEffect(() => localStorage.setItem('skipped',   JSON.stringify(skipped)),   [skipped])
 


  // Prefetch likely next pages
  useEffect(() => {
    if (isLastStep()) {
      if (!isFinalStepToComplete()) {
        // It's the last step, but not all steps aside from this one have been completed
        // Get the first step that has not been completed
        router.prefetch(`${tabPath}/[id]`, getTabLink(steps.find((_step, i) => !completed.includes(i) && i !== activeStep)))
      } else {
        // Get the results page
        router.prefetch(resultsPath)
      }
    } else {
      // Get the next page
      router.prefetch(`${tabPath}/[id]`, getTabLink(steps[activeStep + 1]))
    }
    if (activeStep > 0) {
      // Get the previous page
      router.prefetch(`${tabPath}/[id]`, getTabLink(steps[activeStep - 1]))
    }
  }, [router.asPath])



  const steps = _.map(tabs, c => c.name)

  const getTabName = (step: number): string => {
    return tabs[step]?.name
  }
  
  const totalSteps = () => {
    return steps.length;
  };

  const skippedSteps = () => {
    return skipped.length;
  };

  const completedSteps = () => {
    return completed.length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isFinalStepToComplete = () => {
    return completedSteps() === totalSteps() - skippedSteps() + (completed.includes(activeStep) ? 1 : 0)
  }



  const handleSkip = () => {
    setSkipped((prevSkipped: number[]) => _.union(prevSkipped, [activeStep]))
    handleNext()
  }

  const handleStart = () => {
    setLoading(true)
    setActiveStep(0)
  }

  const handleBack = () => {
    setLoading(true)
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  }

  const handleStep = (step: number) => () => {
    setLoading(true)
    setActiveStep(step);
  }

  const handleNext = () => {
    setLoading(true)
    if (isLastStep()) {
      if (!allStepsCompleted()) {
        // It's the last step, but not all steps have been completed
        // find the first step that has not been completed
        setActiveStep(steps.findIndex((_step, i) => !completed.includes(i)))
      } else {
        router.push(resultsPath)
      }
    } else {
      setActiveStep(activeStep + 1)
    }
  }

  const handleComplete = (toResults?: boolean) => {
    const newCompleted = _.union(completed, [activeStep]);
    setSkipped((prevSkipped: number[]) => {
      return _.remove(prevSkipped, (e) => e !== activeStep);
    });
    setCompleted(newCompleted);
    if (toResults) {
      router.push(resultsPath)
    } else {
      handleNext()
    }
  }



  const isStepSkipped = (step: number) => skipped.includes(step)

  const isStepComplete = (step: number) => completed.includes(step)
  
  const isLastStep = () => activeStep === totalSteps() - 1

  const isHome = () => router.asPath === '/'



  return (
    <div className={classes.root}>
      
      {loading && (
        <LinearProgress />
      )}

      <Hidden mdDown>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: ISetProps = {};
            const buttonProps: IButtonProps = {};
            if (isStepSkipped(index)) {
              buttonProps.optional = <Typography variant="caption">Skipped</Typography>;
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                  <StepButton
                    onClick={handleStep(index)}
                    completed={isStepComplete(index)}
                    {...buttonProps}
                  >
                    {label}
                  </StepButton>
              </Step>
            )
          })}
        </Stepper>
       </Hidden>

      <div>
        {props.children}
      </div>

      {activeStep !== -1 && !loading && (
        <Container maxWidth="lg" className={classes.actionsContainer}>

          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.button}>
            Back
          </Button>
          
          {!completed.includes(activeStep) && (
            <Button
              onClick={handleSkip}
              className={classes.button}
            >
              Skip
            </Button>
          )}

          {!isLastStep() &&
            (completed.includes(activeStep) ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Next
                </Button>
                <Typography variant="caption" className={classes.completed}>
                  Step {activeStep + 1} already completed
                </Typography>
              </>
            ) : (
              <>
                {completedSteps() === totalSteps() - 1 ? (
                  <Button variant="contained" color="primary" onClick={() => handleComplete(true)} className={classes.button}>
                    {'Finish Everything'}
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" onClick={() => handleComplete()} className={classes.button}>
                    {`Complete ${getTabName(activeStep)}`}
                  </Button>
                )}
              </>
            ))
          }
          
          <Button
            style={{justifyContent: 'center'}}
            color="primary"
            onClick={() => router.push(resultsPath)}
            className={classes.button}
          > Results
          </Button>
        </Container>
      )}

      {isHome() && !loading && <BeginButton handleStart={handleStart} classes={classes} />}

      {!isHome() && (
        <Hidden lgUp>
          <hr />
          <nav>
            { _.map(tabs, (tab: ITab, idx: number) => {
              <Button
                key={idx}
                onClick={handleStep(idx)}
                >{tab.name}
              </Button>
            })}
          </nav>
          <hr />
        </Hidden>
      )}
    </div>
  )
}
