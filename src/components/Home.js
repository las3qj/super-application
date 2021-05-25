import {LocationContext} from "./../contexts/locationContext";
import React, { useContext } from "react";

function Home() {
    const {coord} = useContext(LocationContext);
    return(
        <div style={{ textAlign: "center" }}>
            <h1>Welcome to Weather Checker / Restaurant Finder</h1>
            <h2>{coord.lat} , {coord.lon}</h2>
        </div>
    );
}

export default Home;