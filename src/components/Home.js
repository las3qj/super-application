import {LocationContext} from "./../contexts/locationContext";
import React, { useContext } from "react";
import {ThemeContext} from './../contexts/themeContext';

import Container from 'react-bootstrap/Container';

function Home() {
    const {coord, address, zip} = useContext(LocationContext);
    const {darkTheme} = useContext(ThemeContext);
    return(
        <Container fluid style={darkTheme?{textAlign: "center", background: "#484c54", paddingBottom: 200, paddingTop: 200}:
            {textAlign: "center", paddingBottom: 200, paddingTop: 200}}>
            <h1 style={darkTheme?{color:"white"}:{}}>Welcome to Weather Checker / Restaurant Finder</h1>
            <h3 style={darkTheme?{color:"white"}:{}}>Current coordinates: {coord.lat} , {coord.lon}</h3>
            <h3 style={darkTheme?{color:"white"}:{}}>Current zip-code: {zip}</h3>
            <h3 style={darkTheme?{color:"white"}:{}}>Current address: {address.street}, {address.city}, {address.state}</h3>
        </Container>
    );
}

export default Home;