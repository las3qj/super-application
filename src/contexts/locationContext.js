import React, { useState, createContext } from "react";
const LocationContext = createContext();

const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_api_key;

function LocationProvider({children}) {
    const [coord, setCoord] = useState({lat: 38.500, lon: -81.595});
    const [address, setAddress] = useState({street: "119 Washington Avenue",
        city: "Charlottesville", state: "VA"});
    const [zip, setZip] = useState("22903");

    const updateZipCoord = (nZip, nCoord) => {
        console.log("updateZipCoord");
        setCoord(nCoord);
        setZip(nZip);
        const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
        url.searchParams.append("latlng", nCoord.lat+","+nCoord.lon);
        url.searchParams.append("key", GOOGLE_KEY);
        fetch(url).then(resp => resp.json()).then(res => {
            const formatted = res.results[1].formatted_address;
            const fComma = formatted.indexOf(",");
            const street = formatted.substr(0, fComma);
            const sComma = formatted.indexOf(",", fComma+1);
            const city = formatted.substr(fComma+2, sComma-fComma-2);
            const state = formatted.substr(sComma+2, 2);
            setAddress({street: street, city: city, state: state});
        });
    };
    const updateAddressCoordZip = (nCoord, nZip) => {
        setCoord(nCoord);
        setZip(nZip);
    }

    return(
        <LocationContext.Provider value={{coord, address, zip, updateZipCoord, setAddress, updateAddressCoordZip}}>
            {children}
        </LocationContext.Provider>
    );

}

export default LocationProvider;
export {LocationContext};