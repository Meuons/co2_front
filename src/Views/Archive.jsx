import Device from "../Components/Device";
import React, { useState, useEffect, button } from "react";

import DatePicker from "react-datepicker";
import StackedGraph from "../Components/StackedGraph";
import "react-datepicker/dist/react-datepicker.css";

export default function Archive() {
  console.log("archive");
  const date = new Date()
  date.setDate(date.getDate() - 1);
  const [count, setCount] = useState(0);

  const [selects, setSelects] = useState([
    { name: "mill_1", date: date.toISOString().split("T")[0] },
  ]);



  const styles = {
    wrapper: {
      position: "relative",
      width: "90vw",
      boxShadow: "black 10px 5px 5px",
      backgroundColor: "white",
      margin: 20,
    },
    selectsArea: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    selectContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: 20,
      backgroundColor: "#f8f9fa",
      padding: 30,
      borderRadius: 10,
    },
    xBtn: {
      position: "relative",
      bottom: 25,
      left: 20,
      backgroundColor: "#F00",
      color: "#fff",
    },
    dateSelect: {},
    nameSelect: {},
  };

  const addSelects = (obj) => {
    const arr = selects.concat([obj]);
    setSelects(arr);
    setCount(count + 1);
  };
  const deleteSelects = (i) => {
    const arr = selects;
    arr.splice(i, 1);
    setSelects(arr);
    setCount(count + 1);
  };
  const updateSelects = (i, prop, changeDate) => {
    const arr = selects;
    const obj = selects[i];
    if (changeDate) {
      obj.date = prop.toISOString().split("T")[0];
    } else {
      console.log("other" + prop);
      obj.name = prop;
    }
    setSelects(arr);
    setCount(count + 1);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.selectsArea}>
        {selects.map((item, i) => (
          <div key={i} style={styles.selectContainer}>
            <div style={styles.dateSelect}>
              <DatePicker
                selected={new Date(item.date)}
                onChange={(date) => updateSelects(i, date, true)}
              />
            </div>
            <div styles={styles.nameSelect}>
              <select
                value={item.name}
                onChange={(e) => updateSelects(i, e.target.value, false)}
              >
                <option value="mill_1">Mill_1</option>
                <option value="mill_2">Mill_2</option>
                <option value="mill_3">Mill_3</option>
              </select>
            </div>
            <button style={styles.xBtn} onClick={() => deleteSelects(i)}>
              x
            </button>
          </div>
        ))}
        <button
          onClick={() => addSelects({ name: "mill_1", date: new Date() })}
        >
          +
        </button>
      </div>
      <StackedGraph key={count} parameters={selects} />
    </div>
  );
}
