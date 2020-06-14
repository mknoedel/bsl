import * as React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface Params {
    score: number[]
}

const TabChart = (params: Params) => {
    let graphLength = 4

    let {score} = params
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let curMonth = new Date().toLocaleDateString(undefined, {month: 'short'})
    let curYear = new Date().toLocaleDateString(undefined, {year: 'numeric'})
    let monthIndex = months.findIndex((c) => c === curMonth)
    let categories = [...months.slice(monthIndex - 1).map((c) => c + ' ' + curYear), ...months.slice(0, monthIndex).map((c) => c + ' ' + (+curYear + 1))].slice(0, graphLength)
    let data = [score[0], ...Array(graphLength - 1).fill(0)]

    let chartOptions: Highcharts.Options = {
        chart: {
            type: 'column',
            height: '200px'
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
          min: 0,
          max: 5,
          title: {
              text: ''
          }
        },
        title: {
            text: ''
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
        series: [{
            name: 'Your Data',
            type: 'column',
            data: data,
            color: '#556cd6'
        }]
    }

    return (
        <div style={{height: '185px', overflow: 'hidden'}}>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    )
}
  
export default TabChart
  