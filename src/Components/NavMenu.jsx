import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Home from '../Views/Home';
import Archive from '../Views/Archive';

import '../App.css';
const styles = {
    container:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",


    },
    navbar: {
     backgroundColor: 'black',
        width: '100vw',
        position: 'absolute',
        top: 0,
        margin: 0,
        marginBottom: 1000,

    },
    routeContainer: {
     position: 'absolute',
     top: 200
    },
    li:{
        float:'left',
        margin: 20
    },
    link:{
        textDecoration: 'none',
        color: 'white'
    }
}
class App extends Component {
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div style={styles.container} >
                    <div style={styles.navbar}>
                    <ul style={styles.navbar}>
                        <li style={styles.li}>
                            <Link style={styles.link} to="/">Home</Link>
                        </li>
                        <li style={styles.li}>
                            <Link style={styles.link} to="/Archive">Archive</Link>
                        </li>
                    </ul>
                    </div>
                    <div style={styles.routeContainer}>
                    <Routes>
                        <Route exact path='/co2-front' element={< Home />}></Route>
                        <Route exact path='/co2_front/Archive' element={< Archive />}></Route>
                    </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;