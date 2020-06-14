//@ts-nocheck

import * as React from 'react'
import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === 'object') {
    highchartsMore(Highcharts)
    solidGauge(Highcharts)
}

interface Params {
    score: number
}

const TabGauge = (params: Params) => {

    let chartOptions: Highcharts.Options = {
        chart: {
            type: 'bar',
            height: '50px'
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        yAxis: {
            min: 0,
            max: 5,
            lineWidth: 0,
            tickWidth: 1,
            tickAmount: 6,
            title: {
                enabled: false
            },
            labels: {
                y: -15
            }
        },
        xAxis: {
            labels: {
                enabled: false
            }
        },
        plotOptions: {
            bar: {
                animation: {
                    duration: 3000
                },
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Eval',
            type: 'bar',
            color: '#556cd6',
            data: [params.score],
            enableMouseTracking: false,
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:24px">{y:.2f}</span><br/>' +
                    '<span style="font-size:10px;opacity:0.4">' +
                    '(Score/# of ?\'s)' +
                    '</span>' +
                    '</div>'
            },

        }]
    }

    return (
        <div style={{height: '35px', overflow: 'hidden'}}>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    )
}
  
export default TabGauge
  