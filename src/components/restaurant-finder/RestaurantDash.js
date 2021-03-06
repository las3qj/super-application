import {useState, useEffect, useContext} from "react";
import RestaurantList from './RestaurantList';
import SearchBar from './SearchBar';
import {LocationContext} from "./../../contexts/locationContext";
import {ThemeContext} from "./../../contexts/themeContext";
import {Col, Row, Container} from 'react-bootstrap';
import ReactMapGL, {Marker} from 'react-map-gl';

const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_api_key;
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_api_key;

function RestaurantDash(){
    const [restaurants, setRestaurants] = useState([]);
    const [currType, setCurrType] = useState("restaurant");
    const [currRadius, setCurrRadius] = useState(0);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 38.026,
        longitude: -78.535,
        zoom: 12
      });
    const {coord, address, setAddress, updateAddressCoordZip} = useContext(LocationContext);
    const {darkTheme} = useContext(ThemeContext);

    useEffect(() => {
        const getAPI = async () => {
            await getCoord().then(resp => {
                if(resp.results.length>0) {
                    const coord = {lat: resp.results[0].geometry.location.lat, lon: resp.results[0].geometry.location.lng};
                    
                    const zip = resp.results[0].address_components[resp.results[0].address_components.length-1].long_name;
                    updateAddressCoordZip(coord, zip);
                    setViewport({...viewport, 
                        latitude: resp.results[0].geometry.location.lat, longitude: resp.results[0].geometry.location.lng});
                }
                return(getRest());}
            ).then(resp => setRestaurants(resp.results));
        }
        const getCoord = async () => {
            const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
            url.searchParams.append("address", address.street+" "+address.city+" "+address.state);
            url.searchParams.append("key", GOOGLE_KEY);

            return fetch(url)
                .then((resp) => resp.json());
        }
        const getRest = async () => {
            const location = coord.lat+","+coord.lon;
            const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
            url.searchParams.append("key", GOOGLE_KEY);
            url.searchParams.append("location", location);
            if(currRadius===0) {
                url.searchParams.append("rankby", "distance");
            }
            else {
                url.searchParams.append("radius", currRadius);
            }
            url.searchParams.append("type", currType);
            url.searchParams.append("opennow", true);
            return fetch(url)
                .then(resp => resp.json());            

        }
        getAPI();
    }, [address, currType, currRadius]);

    return(
        <Container style={darkTheme?{background: "#484c54"}:{}}>
            <SearchBar address={address} updateAddress={setAddress}></SearchBar>
            <Row>
                <RestaurantList restaurants={restaurants} setType={setCurrType} setRadius={setCurrRadius}/>
                <Col>
                    <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        onViewportChange={nextViewport => setViewport(nextViewport)}
                    >
                        {restaurants.map(restaurant => {
                            return(
                            <Marker latitude={restaurant.geometry.location.lat} longitude={restaurant.geometry.location.lng} 
                                offsetLeft={-20} offsetTop={-10} 
                                captureClick={false}>
                                <img src="pin.png" width={10} height={10}/>
                                <div>{restaurant.name}</div>
                            </Marker>);
                        })}
                    </ReactMapGL>
                </Col>
            </Row>
        </Container>
    );
}

export default RestaurantDash;