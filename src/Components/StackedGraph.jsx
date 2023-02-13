import React, { useState, useEffect } from "react";

import Chart from "react-apexcharts";

import { getData } from "../API/getData";

export default function StackedGraph({ parameters }) {
  const [chartData] = useState([]);
  const [count, setCount] = useState(0);

  const xAxis = () => {
    const arr = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j++) {
        if (i < 10 && j < 10) {
          arr.push("2018-09-19T0" + i + ":" + "0" + j + ":00.000Z");
        } else if (i > 9 && j < 10) {
          arr.push("2018-09-19T" + i + ":" + "0" + j + ":00.000Z");
        } else if (i < 10 && j > 9) {
          arr.push("2018-09-19T0" + i + ":" + j + ":00.000Z");
        } else {
          arr.push(`2018-09-19T${i}:${j}:00.000Z`);
        }
      }
    }
    return arr;
  };
  console.log(xAxis());
  const fetch = (date, name) => {
    const url =
      "https://co2-server-app.herokuapp.com/timestamps/date/" +
      date +
      "/name/" +
      name;
    console.log(url);
    getData(url, async (result) => {
      const { data, error } = result;

      sortData(data);
      if (error) {
        // Handle error
        return;
      }
    });
  };

  useEffect(() => {
    parameters.map((item, i) => {
      fetch(new Date(item.date).toISOString().split("T")[0], item.name);
    });
  }, []);
  function sortData(data) {
    if (data) {
      const mapCO2 = () =>
        data.set.map((item, i) => {
          if (item.ECO2 === 0 && i > 0) {
            item.ECO2 = data.set[i - 1].ECO2;
          }

          return item.ECO2;
        });

      const CO2Data = mapCO2();

      chartData.push({
        name:
          data.set[0].DeviceName + " " + data.set[0].StampDate.split("T")[0],
        data: CO2Data,
      });
      if (chartData.length == parameters.length) {
        setCount(count + 1);
      }
    }
  }

  const options = {
    chart: {
      height: 450,
      zoom: {
        autoScaleYaxis: true,
      },
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
      categories: xAxis(),
    },
    tooltip: {
      x: {
        format: "HH:mm",
      },
    },
    yaxis: {
      title: {
        text: "PPM ECO2",
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
    <div key={count} style={{ width: "90vw" }}>
      {chartData.length != parameters.length ? (
        <div>
          <h1>Loading chart...</h1>
        </div>
      ) : (
        <Chart
          options={options}
          series={chartData}
          type="area"
          height={350}
          width={"100%"}
        />
      )}
    </div>
  );
}
