import {Card, Button} from 'react-bootstrap';
import {ThemeContext} from './../../contexts/themeContext';
import { useContext } from 'react';

function ListItem({restaurant}) {
    const rating = restaurant.rating || "?";
    const dirRef = "https://www.google.com/maps/search/?api=1&query="+
        restaurant.geometry.location.lat+","+restaurant.geometry.location.lng;
    const {darkTheme} = useContext(ThemeContext);

    let pricing = "";
    if(restaurant.price_level===undefined) {
        pricing = "?";
    }
    for(let i = 0; i < restaurant.price_level; i++) {
        pricing = pricing+"$";
    }

    return(
        <Card bg={darkTheme?"dark":"light"}>
            <Card.Body>
                <Card.Title style={darkTheme?{color:"white"}:{}}>{restaurant.name}</Card.Title>
                <Card.Text style={darkTheme?{color:"white"}:{}}>
                    {rating} / 5.0 <br/>
                    {pricing}
                </Card.Text>
                <Button variant={darkTheme?"secondary":"primary"} href={dirRef}>Get Directions</Button>
            </Card.Body>
        </Card>

    );
}

export default ListItem;