import { Route, Switch } from 'react-router-dom';
import { useState } from "react";
import WeatherDash from './weather-app/WeatherDash';
import RestaurantDash from './restaurant-finder/RestaurantDash';
import Home from './Home';
import Error from './Error';
import NavBar from './NavBar';

const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_api_key;

function Locator() {
    const [coord, setCoord] = useState({lat: 38.500, lon: -81.595});
    const [address, setAddress] = useState({street: "119 Washington Avenue",
        city: "Charlottesville", state: "VA"});
    const [zip, setZip] = useState("22903");
    const updateZipCoord = (nZip, nCoord) => {
        setCoord(nCoord);
        setZip(nZip);
        const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
        url.searchParams.append("latlng", nCoord.lat+","+nCoord.lon);
        url.searchParams.append("key", GOOGLE_KEY);
        fetch(url).then(resp => resp.json()).then(res => {
            const formatted = res.results.formatted_address;
            const fComma = formatted.indexOf(",");
            const street = formatted.substr(0, fComma);
            const sComma = formatted.indexOf(",", fComma+1);
            const tComma = formatted.indexOf(",", sComma+1);
            const city = formatted.substr(sComma+2, tComma);
            const state = formatted.substr(tComma+2, 2);
            setAddress({street: street, city: city, state: state});
        });
    };
    const updateAddressCoordZip = (nCoord, nZip) => {
        setCoord(nCoord);
        setZip(nZip);
    }

    return(
        <main>
            <NavBar/>
            <Switch>
                <Route path='/' render={(props) => (
                    <Home coord={coord}/>)} exact/>
                <Route path='/weather' render={() => (
                    <WeatherDash coord={coord} updateAddress={updateZipCoord}/>)}
                />
                <Route path='/restaurants' render={() => (
                    <RestaurantDash coord={coord} address={address} setAddress={setAddress} updateAddress={updateAddressCoordZip}/>)}
                />
                <Route component={Error} />
            </Switch>
        </main>
    );
}

export default Locator;