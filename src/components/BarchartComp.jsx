import React from "react";
import ReactApexChart from "react-apexcharts";
// import Chart from "react-apexchart";

const BarchartComp =  () => {
    const opts = {
        options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            },
            plotOptions: {
                bar: {
                  borderRadius: 10
                }
              }
          },
          series: [
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]
        };
    
    return (
        <div className="row">
        <div className="mixed-chart">
          <ReactApexChart
            options={opts.options}
            series={opts.series}
            type="bar"
            width="100%"
            height={400}
          />
        </div>
      </div>
    )
}

export default BarchartComp;