import React, { useEffect, useState, useContext } from "react";
import WeatherCard from "./WeatherCard";
import WeatherBox from "./WeatherBox";
import {LocationContext} from "./../../contexts/locationContext";
import {Button, TextField, Grid} from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import { ThemeContext } from "../../contexts/themeContext";
const API_KEY = process.env.REACT_APP_WEATHER_api_key;

function WeatherDash() {
    const {coord, updateZipCoord} = useContext(LocationContext);
    const [search, setSearch] = useState(coord.lat+","+coord.lon);
    const [weather, setWeather] = useState(null);
    const [daily, setDaily] = useState(true);
    const handleChange = (event) => {
        setSearch(event.target.value);
    }
    const {darkTheme} = useContext(ThemeContext);
    useEffect(() => {
        const getAPI = async () => {
            const comma = search.indexOf(",");
            const lat = parseFloat(search);
            const lon = parseFloat(search.substr(comma+1));
            if(comma<0||isNaN(lat)||isNaN(lon)){
                await getCoord().then(resp => {
                    if(resp.cod===200){
                        updateZipCoord(search, resp.coord);
                    }
                    return(getWeather(resp.coord));
                }).then(res => setWeather(res)).catch(e => {return;});
            }
            else {
                await getWeather({lat: lat, lon: lon}).then(res => setWeather(res)).catch(e => {return;});
            }
        }
        const getCoord = async () => {
            const url = new URL("https://api.openweathermap.org/data/2.5/weather");
            if(isNaN(search)) {
                url.searchParams.append("q", search);
            }
            else {
                url.searchParams.append("zip", search);
            }

            url.searchParams.append("appid", API_KEY);
            url.searchParams.append("units", "imperial");
            return fetch(url)
                .then((resp) => resp.json());
        }
        const getWeather = async (coord) => {
            const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
            url.searchParams.append("lat", coord.lat);
            url.searchParams.append("lon", coord.lon);
            url.searchParams.append("units", "imperial");
            url.searchParams.append("appid", API_KEY);
            return fetch(url)
                .then((resp) => resp.json()
            );
        }
        getAPI();

      }, [search]);


    let weathers = weather===null ? null : daily ? weather.daily : weather.hourly;
    return(
        <Container style={{ textAlign: "center" }}>
            <TextField id="standard-basic" label="zip or city" value={search || ""} onChange={handleChange} style={darkTheme?{color:"white"}:{}}/>
            <br/>
            <br/>
            <Button variant="contained" color={daily?"primary":"default"} onClick={()=>setDaily(true)}>Daily</Button>
            <Button variant="contained" color={!daily?"primary":"default"} onClick={()=>setDaily(false)}>Hourly</Button>
            <br/>
            <br/>
            <WeatherBox>
                {weather!==null && weathers.map((weather, index) => {
                    return(
                        <Grid key={index} item>
                            <WeatherCard weather={weather} type={daily?"day":"hour"}></WeatherCard>
                        </Grid>
                    );
                })}
            </WeatherBox>
        </Container>
    );
}

export default WeatherDash;