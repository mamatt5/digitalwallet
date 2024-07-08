import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const PieChart = (props) => {
  const [series, setSeries] = useState(props.amounts);
  const [options, setOptions] = useState({ labels: props.names });

  useEffect(() => {
    setSeries(props.amounts);
    setOptions({ 
      labels: props.names,
      plotOptions: {
        pie: {
          expandOnClick: false,
          stroke: {
            width: 0, // Set the width to 0 to remove the border
            colors: undefined // You can also ensure the colors property is set to undefined
          }
        }
      },
      legend: {
        show: true,
        labels: {
            colors: "var(--text)",
            useSeriesColors: false,
            style: {
                fontSize: "0.9rem"
            }
        }
      },
     });
  }, [props.amounts, props.names]);

  return (
    <div className="pie">
      <Chart options={options} series={series} type="pie" width="100%" />
    </div>
  );
};

export default PieChart;
