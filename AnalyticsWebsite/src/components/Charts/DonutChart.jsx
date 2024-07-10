import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const DonutChart = (props) => {
  const [series, setSeries] = useState(props.amounts);
  const [options, setOptions] = useState({ labels: props.names });

  useEffect(() => {
    setSeries(props.amounts);
    setOptions({ 
      labels: props.names,
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                color: "#ffffff"
              },
              value: {
                showAlways: true,
                show: true,
                color: "#ffffff",
                fontSize: 25
              }
            }
          },
          expandOnClick: false
        }
      },
      legend: {
        show: true,
        labels: {
            colors: "#ffffff"
        }
      },
     });
  }, [props.amounts, props.names]);

  return (
    <div className="donut">
      <Chart options={options} series={series} type="donut" width="100%" />
    </div>
  );
};

export default DonutChart;
