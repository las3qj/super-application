import {LocationContext} from "./../contexts/locationContext";
import React, { useContext } from "react";
import {ThemeContext} from './../contexts/themeContext';

import Container from 'react-bootstrap/Container';

function Home() {
    const {coord} = useContext(LocationContext);
    const {darkTheme} = useContext(ThemeContext);
    return(
        <Container fluid style={darkTheme?{textAlign: "center", background: "#484c54"}:{textAlign: "center"}}>
            <h1 style={darkTheme?{color:"white"}:{}}>Welcome to Weather Checker / Restaurant Finder</h1>
            <h2 style={darkTheme?{color:"white"}:{}}>{coord.lat} , {coord.lon}</h2>
        </Container>
    );
}

export default Home;