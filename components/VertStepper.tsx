import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { IForm } from '../interfaces';
import { Grid } from '@material-ui/core';
import DiscreteSlider from './DiscreteSlider';

interface Props {
    form?: IForm
    setValue: (value: number, index: number) => void
  }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
);

export default function VerticalLinearStepper(props: Props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const {form, setValue} = props

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
        handleNext()
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {form?.map((field, index) => (
          <Step key={index}>
            <StepLabel>
                {field.value && <>({field.value}){'  '}</>}
                {field.question}
            </StepLabel>
            <StepContent>
              <Grid key={index}>
                <DiscreteSlider field={field} idx={index} setValue={setValue} onKeyPress={onKeyPress} valueDisplay={false}/>
              </Grid>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === form.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === form?.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Button onClick={handleReset} className={classes.button}>
            Return to First Question
          </Button>
        </Paper>
      )}
    </div>
  );
}