import * as React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import getRating from '../utils/getRating'
import _ from 'lodash'

interface Scores {
    name: string
    rating: number
}

const ResultsChartMobile = () => {

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
            type: 'bar',
            height: '950px',
            reflow: false,
        },
        xAxis: {
            categories: categories,
            labels: {
                rotation: 0,
                overflow: "justify",
                align: 'left',
                x: 5,
                y: -15
            }
        },
        yAxis: {
          min: 0,
          max: 5,
          ceiling: 5,
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
                type: 'bar',
                data: data,
                label: {
                    onArea: false,
                    connectorNeighbourDistance: 2
                },
                color: '#556cd6'
            }
        ]
    }

    return (
        <div style={{height: '935px', overflow: 'hidden'}}>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    )
}
  
export default ResultsChartMobile
  