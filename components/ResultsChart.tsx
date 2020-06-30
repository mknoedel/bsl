import * as React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import _ from 'lodash'
import { Scores } from '../interfaces'

const ResultsChart = (props: {
    scores: Scores[],
  }) => {
    const { scores } = props
    let categories = scores.map((score) => score.name)
    let data = scores.map((score) => score.rating)

    let chartOptions: Highcharts.Options = {
        chart: {
            type: 'column',
            height: '600px'
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            visible: true,
            max: 5,
            min: 0,
            title: {
                text: ''
            }
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
              animation: {
                duration: 3000
            }
          }
        },
        tooltip: {
            formatter: function (): string {
                let thing = this as any
                return '<b>' + thing.series.name + '</b><br/>' + thing.x + ': ' + thing.y;
            }
        },
        series: [
            {
                name: new Date().toLocaleDateString(undefined, {year: 'numeric', month: 'short'}),
                type: 'column',
                data: data,
                color: '#556cd6'
            },
        ]
    }

    return (
        <div style={{height: '585px', overflow: 'hidden', width: '98.5%'}}>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    )
}

export default ResultsChart
  