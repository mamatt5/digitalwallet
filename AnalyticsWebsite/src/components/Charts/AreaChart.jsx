import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import '../Charts/charts.css'

const AreaChart = (props) => {
  const [series, setSeries] = useState([{ data: [] }]);
  const [options, setOptions] = useState({
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: '100%',
      zoom: {
        autoScaleYaxis: true
      },
      toolbar: {
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        style: {
          fontSize: '100px' // Increase the font size of the toolbar icons
        }
      }
    },
    colors: ['none'],
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    grid: {
      show: true,
      borderColor: '#90A4AE', // Color of the grid lines
      strokeDashArray: 5, // Dash pattern of the grid lines
      position: 'back', // Position the grid at the back
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
      tooltip: {
        enabled: false
      },
      labels: {
          style: {
              colors: "var(--desat-secondary)",
              fontSize: "0.9rem"
          }
      }
    },
    yaxis: {
        labels: {
            formatter: function (value) {
                var units = ["","K","M","B"]
                var unit = (value / 1.0e+1).toFixed(0).toString().length
                var r = unit%3
                var x =  Math.abs(Number(value))/Number('1.0e+'+(unit-r)).toFixed(2)
                return "$"+((Math.round(x)==x) ? x : x.toFixed(2))+ ' ' + units[Math.floor(unit / 3)]
            },
            style: {
                colors: "var(--desat-secondary)",
                fontSize: "0.9rem"
            }
        }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => {
          return "$" + value.toFixed(2);
        }
      },
      style: {
        colors: "var(--text)",
        fontSize: "0.9rem",
        paddingLeft: 0,
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.5, // Adjust shade intensity
        inverseColors: false, // Inverse the colors if true
        opacityFrom: 0.8, // Opacity at the start
        opacityTo: 0.2, // Opacity at the end
        stops: [0, 100], // Gradient stop positions
        colorStops: [
          {
            offset: 0,
            color: "var(--accent)", // Starting color
            opacity: 1
          },
          {
            offset: 100,
            color: "var(--secondary)", // Ending color 
            opacity: 0.8
          }
        ]
      }
    },
  });

  useEffect(() => {

    const transactions = props.transactions;

    const aggregatedData = transactions.reduce((acc, transaction) => {

      const date = new Date(transaction.date).toISOString().split('T')[0];
      const amount = parseFloat(transaction.amount);
      
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += amount;
      return acc;
    }, {});

    const data = Object.keys(aggregatedData).map(date => {
      return [new Date(date).getTime(), aggregatedData[date]];
    });

    data.sort((a, b) => a[0] - b[0]);

    setSeries([{ name: "Daily Revenue", data }]);

    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        min: data[0][0],
        max: data[data.length - 1][0],
      }
    }));
  }, []);

  useEffect(()=>{
    if (series[0].data.length !== 0) {
      const data = series[0].data;
      const maxDate = new Date(data[data.length - 1][0]);
      let minDate;

      switch (props.time) {
        case 'one_week':
          minDate = new Date(maxDate - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'one_month':
          minDate = new Date(maxDate);
          minDate.setMonth(minDate.getMonth() - 1);
          break;
        case 'six_months':
          minDate = new Date(maxDate);
          minDate.setMonth(minDate.getMonth() - 6);
          break;
        case 'one_year':
          minDate = new Date(maxDate);
          minDate.setFullYear(minDate.getFullYear() - 1);
          break;
        case 'ytd':
          minDate = new Date(maxDate.getFullYear(), 0, 1);
          break;
        case 'all':
        default:
          minDate = new Date(data[0][0]);
          break;
      }

      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        minDate.getTime(),
        maxDate.getTime()
      );
    }
    
  }, [props.time])

  return (
    <div style={{ width: '100%', marginBottom: "2rem" }}>
      <div id="chart">
        <div id="chart-timeline">
          <ReactApexChart 
            options={options} 
            series={series} 
            type="area" 
            height="100%"
            width="100%"/>
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
