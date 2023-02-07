import React, { useState, useEffect } from "react";

import Chart from "react-apexcharts";

import { getData } from "../API/getData";

export default function TestGraph({ date, name }) {
  const [chartData, setChartData] = useState([]);

  const [data, setData] = useState(null);
  const url =
    "https://co2-server-app.herokuapp.com/timestamps/date/" +
    date +
    "/name/" +
    name;

  useEffect(() => {
    async function fetchData() {
      if (data) {
        console.log(data.set);
        const getMinuteDerivative = (i) => {
          if (i > 0 && i < data.set.length - 1) {
            const y1 = data.set[i - 1].ECO2;
            const y2 = data.set[i + 1].ECO2;

            const Ydiff = y2 - y1;
            const d = Ydiff / 2;

            return d;
          } else {
            return 0;
          }
        };
        const mapCO2 = async () =>
          data.set.map((item, i) => {
            if (item.ECO2 === 0 && i > 0) {
              item.ECO2 = data.set[i - 1].ECO2;
            }

            const obj = { x: new Date(item.StampDate).getTime(), y: item.ECO2 };
            return obj;
          });
        const mapMinuteD = async () =>
          data.set.map((item, i) => ({
            x: new Date(item.StampDate).getTime(),
            y: Math.round(getMinuteDerivative(i)),
          }));

        const CO2Data = await mapCO2();
        const minuteD = await mapMinuteD();

        setChartData([
          {
            name: "d",
            data: minuteD,
          },
          {
            name: "ECO2",
            data: CO2Data,
          },
        ]);
      }
    }
    fetchData();
  }, [data]);

  useEffect(() => {
    setInterval(() => {
      getData(url, async (result) => {
        const { data, error } = result;
        setData(data);
        if (error) {
          // Handle error
          return;
        }
      });
    }, 1000);
  }, []);

  const options = {
    chart: {
      height: 450,

      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
      },
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      show: false,
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },

    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleTimeString("sv-SE", {
            timeZone: "Europe/London",
            hour: "numeric",
            minute: "numeric",
          });
        },
      },
    },
    yaxis: {
      title: {
        text: "ECO2",
      },

      min: 350,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  return (
    <div>
      {chartData.length > 0 ? (
        <Chart
          options={options}
          series={chartData}
          type="area"
          height={350}
          width={3000}
        />
      ) : (
        <div>
          <h1>Loading chart...</h1>
        </div>
      )}
    </div>
  );
}
