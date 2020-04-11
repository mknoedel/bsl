import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import _ from 'lodash';
import { IField } from '../interfaces';
import { Typography } from '@material-ui/core';

interface IDiscreteSliderProps {
  field: IField,
  idx: number,
  setValue: (value: number, index: number) => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLSpanElement>) => void
  valueDisplay?: boolean
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(2),
  },
  marks: {
    fontSize: '8px',
  },
}))

let marks: any = [
  {
    value: 1,
    label: 'Never',
  },
  {
    value: 2,
    label: 'Not Much',
  },
  {
    value: 3,
    label: 'Neutral',
  },
  {
    value: 4,
    label: 'A Bit',
  },
  {
    value: 5,
    label: 'Always',
  }
];
let marksReverse: any = [
  {
    value: 5,
    label: 'Never',
  },
  {
    value: 4,
    label: 'Not Much',
  },
  {
    value: 3,
    label: 'Neutral',
  },
  {
    value: 2,
    label: 'A Bit',
  },
  {
    value: 1,
    label: 'Always',
  }
];

marks = _.forEach(marks, (c) => c.label = <Typography style={{fontSize: '9px'}}>{c.label}</Typography>)
marksReverse = _.forEach(marksReverse, (c) => c.label = <Typography style={{fontSize: '9px'}}>{c.label}</Typography>)

function valuetext(value: number): string {
  return _.find(marks, c => c.value === value)?.label || ''
}


export default function DiscreteSlider({field, idx, setValue, onKeyPress, valueDisplay}: IDiscreteSliderProps) {
  const classes = useStyles()
  let {name, value, flip} = field
  value = value || 0

  return (
    <div className={classes.root}>
      <Slider
        getAriaValueText={valuetext}
        ThumbComponent={'span'}
        aria-labelledby="discrete-slider"
        valueLabelDisplay={valueDisplay ? "auto" : "off"}
        id={name}
        ref={(span: any) => {
          if (span?.children && onKeyPress) {
            span.children[span.children.length - 1].focus()
          }
        }}
        value={value}
        step={1}
        min={1}
        max={5}
        marks={flip ? marksReverse : marks}
        onChange={(_e, val) => setValue(val as number, idx)}
        onKeyPress={(e) => {
          if (onKeyPress) {
            onKeyPress(e)
          }
        }}
      />
      <div className={classes.margin} />
    </div>
  )
}