import Device from "../Components/Device";
import React, { useState, useEffect, } from "react";

import DatePicker from "react-datepicker";
import Graph from "../Components/Graph";
import "react-datepicker/dist/react-datepicker.css";

export default function Archive() {
    const [startDate, setStartDate] = useState(new Date());
    const [name, setName] = useState('mill_1');
    const [stringDate, setStringDate]= useState(new Date().toISOString().split("T")[0]);
    const [key, setKey] = useState('')

    useEffect(() => {
        setStringDate(startDate.toISOString().split("T")[0]);
        setKey(startDate.toISOString().split("T")[0])
    }, [startDate]);

    useEffect(() => {
        setKey(name)
    }, [name]);
const styles = {
    wrapper: {
        position: "relative",

        width: '90vw',
        boxShadow: "black 10px 5px 5px",
        backgroundColor: "white",
        margin: 20,

    },
    selectContainer:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    dateSelect: {

    },
    nameSelect: {

    }

}
    return (
        <div style={styles.wrapper}>
            <div style={styles.selectContainer}>
            <div style={styles.dateSelect}>
                <h3>Date</h3>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div styles={styles.nameSelect}>
                <h3>Name</h3>
            <select value={name} onChange={ e => setName(e.target.value)}>
                <option value="mill_1">Mill_1</option>
                <option value="mill_2">Mill_2</option>
                <option value="mill_3">Mill_3</option>
            </select>
            </div>
            </div>
            <Graph
                key={key}
                name={name}
                date={stringDate}
            />

</div>
    )
}