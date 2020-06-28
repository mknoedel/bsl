import * as React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import getRating from '../utils/getRating'
import _ from 'lodash'
import { ITab } from '../interfaces'

interface Scores {
    name: string
    rating: number
}

const ResultsChart = (props: {
    tabs: ITab[]
  }) => {
    const { tabs } = props
    const [scores, setScores] = React.useState<Scores[]>([])
    React.useEffect(() => {
        let results = _.map(tabs, (tab) => {
        let storedTab: string = localStorage.getItem(tab?.name) || ''
        let rating = storedTab ? getRating(JSON.parse(storedTab)) : 0
        return {rating: rating, name:tab.name}
        })
        setScores(results)
    }, [])

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
  