import BatteryGauge from "react-battery-gauge";
import { ValueContainer } from "./ValueContainer";
import { getData } from "../API/getData";
import React, { useState, useEffect } from "react";
import Graph from "./Graph";
const url = "https://co2-server-app.herokuapp.com/devices";

const styles = {
  wrapper: {
    position: "relative",
    top: 500,
    width: 2000,
    boxShadow: "black 10px 5px 5px",
    backgroundColor: "white",
    margin: 20,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  leftHeader: {
    position: "relative",
    right: 300,
  },
  battery: {
    position: "relative",
    left: 300,
  },
  values: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  online: {
    color: "green",
  },
  offline: {
    color: "red",
  },
};

export default function Device() {
  const [deviceData, setDeviceData] = useState([]);
  const today = new Date();
  const date = today.toISOString().split("T")[0];

  useEffect(() => {
    setInterval(() => {
      getData(url, (result) => {
        const { data, error } = result;
        if (error) {
          // Handle error
          return;
        }

        if (data) {
          setDeviceData(data);
        }
      });
    }, 1000);
  }, []);
  return (
    <>
      {deviceData.devices == undefined ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          {deviceData.devices.map((item, i) => (
            <div>
              {item !== null ? (
                <div key={i} style={styles.wrapper}>
                  <div style={styles.header}>
                    <div style={styles.leftHeader}>
                      <h1>{item.deviceName}</h1>
                      {item.onlineStatus == 1 ? (
                        <span style={styles.online}>online</span>
                      ) : (
                        <span style={styles.offline}>offline</span>
                      )}
                    </div>
                    <BatteryGauge
                      customization={{
                        readingText: {
                          fontSize: 34,
                        },
                      }}
                      style={styles.battery}
                      size={60}
                      value={item.batteryPer}
                    />
                  </div>
                  <div style={styles.values}>
                    <ValueContainer
                      title={"eco2"}
                      value={item.eco2}
                      unit={"ppm"}
                      max={3000}
                    />
                    <ValueContainer
                      title={"temperature"}
                      value={item.ambientTemp}
                      unit={"°C"}
                      max={40}
                    />
                    <ValueContainer
                      title={"humidity"}
                      value={item.humidity}
                      unit={"%"}
                      max={100}
                    />
                    <ValueContainer
                      title={"TVOC"}
                      value={item.tvoc}
                      unit={"ppb"}
                      max={861}
                    />
                  </div>
                  <Graph name={item.deviceName} date={date} />
                </div>
              ) : (
                <div>
                  <h1>No data found</h1>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
