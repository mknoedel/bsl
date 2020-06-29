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
  const classes = useStyles();
  const router = useRouter()
  let initialStep = _.findIndex(tabs, tab => getTabLink(tab.name) === router.asPath)

  const [activeStep, setActiveStep] = React.useState(initialStep);
  const [completed, setCompleted] = React.useState(new Array());
  const [skipped, setSkipped] = React.useState(new Array());

  useEffect(() => {
    let storedActiveStep = localStorage.getItem('activeStep') || ''
    let storedCompleted = localStorage.getItem('completed') || ''
    let storedSkipped = localStorage.getItem('skipped') || ''

    if (!initialStep && storedActiveStep) setActiveStep(Number(storedActiveStep))
    if (storedCompleted) setCompleted(JSON.parse(storedCompleted))
    if (storedSkipped) setSkipped(JSON.parse(storedSkipped))
  }, []) 

  useEffect(() => {
    localStorage.setItem('activeStep', String(activeStep))
    let newTab = tabs[activeStep]
    if (getTabLink(newTab?.name) && (router.asPath !== getTabLink(newTab.name))) {
      setLoading(true)
      const tabLink = getTabLink(newTab.name)
      router.push(tabLink ? "/tabs/[id]" : "/", tabLink ? tabLink : undefined)
    }
  }, [activeStep])
  useEffect(() => {
    localStorage.setItem('completed', JSON.stringify(completed))
  }, [completed])
  useEffect(() => {
    localStorage.setItem('skipped', JSON.stringify(skipped))
  }, [skipped])
 
  // Prefetch
  useEffect(() => {
    // Next page
    if (isLastStep()) {
      if (!allStepsBuyOneCompleted()) {
        // It's the last step, but not all steps have been completed
        // find the first step that includes been completed
        router.prefetch("/tabs/[id]", getTabLink(steps.find((_step, i) => !completed.includes(i))) || undefined)
      } else {
        router.prefetch('/results')
      }
    } else {
      router.prefetch("/tabs/[id]", getTabLink(steps[activeStep + 1]) || undefined)
    }
    // Previous page
    if (activeStep) {
      router.prefetch("/tabs/[id]", getTabLink(tabs[activeStep - 1]?.name) || undefined)
    }
  }, [router.asPath])


  const steps = _.map(tabs, c => c.name);

  const totalSteps = () => {
    return steps.length;
  };

  const getStepName = (step: number): string => {
    return tabs[step]?.name || 'unknown'
  }

  // const isStepOptional = (step: number) => {
  //   return tabs[step]?.optional || true
  // };

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   throw new Error("You can't skip a step that isn't optional.");
    // }
    setSkipped((prevSkipped: Array<unknown>) => {
      return _.union(prevSkipped, [activeStep]);
    });
    handleNext()
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

  const allStepsBuyOneCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps() + 1
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const goToResults = () => {
    router.push('/results')
  }

  const handleNext = () => {
      setLoading(true)
      if (isLastStep()) {
        if (!allStepsCompleted()) {
          // It's the last step, but not all steps have been completed
          // find the first step that includes been completed
          setActiveStep(steps.findIndex((_step, i) => !completed.includes(i)))
        } else {
          goToResults()
        }
      } else {
        setActiveStep(activeStep + 1)
      }
  };

  const handleStart = () => {
    setLoading(true)
    setActiveStep(0)
  };

  const handleBack = () => {
    setLoading(true)
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setLoading(true)
    setActiveStep(step);
  };

  const handleComplete = (toResults?: boolean) => {
    const newCompleted = _.union(completed, [activeStep]);
    setSkipped((prevSkipped: Array<unknown>) => {
      return _.remove(prevSkipped, (e) => e !== activeStep);
    });
    setCompleted(newCompleted);
    if (toResults) {
      goToResults()
    } else {
      handleNext()
    }
  };

  const isStepSkipped = (step: number) => {
    return skipped.includes(step);
  };

  function isStepComplete(step: number) {
    return completed.includes(step);
  }

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
            // else if (isStepOptional(index)) {
            //   buttonProps.optional = <Typography variant="caption">Optional</Typography>;
            // }
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
        <div>

          {props.children}

          {activeStep !== -1 && !loading && (
            <Container maxWidth="lg" className={classes.actionsContainer}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {
                // isStepOptional(activeStep) && 
                !completed.includes(activeStep) && (
                  <Button
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )
              }

              {activeStep !== steps.length &&
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
                        {`Complete ${getStepName(activeStep)}`}
                      </Button>
                    )}
                  </>
                ))
              }
              
              <Button
                style={{justifyContent: 'center'}}
                color="primary"
                onClick={goToResults}
                className={classes.button}
              > Results
              </Button>
            </Container>
          )}

          {router.asPath === '/' && !loading && <BeginButton handleStart={handleStart} classes={classes} />}
        </div>
      </div>

      {router.asPath !== '/' && (
        <Hidden lgUp>
          <hr />
          <nav>
            {_.map(tabs, (tab: ITab, idx: number) => <Button key={idx} onClick={handleStep(idx)}>{tab.name}</Button>)}
          </nav>
          <hr />
        </Hidden>
      )}
    </div>
  );
}
