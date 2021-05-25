import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import {ThemeContext} from './../contexts/themeContext';
import { Link } from "react-router-dom";
import { useContext } from 'react';

function NavBar() {
    const {darkTheme, setDarkTheme} = useContext(ThemeContext);
    return(
        <Navbar bg={darkTheme?"dark":"light"} variant={darkTheme?"dark":"light"}>
            <Navbar.Brand href="/home">Super-Application</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/weather">Weather</Link></Nav.Link>
                    <Nav.Link><Link to="/restaurants">Restaurants</Link></Nav.Link>
                    <Button variant={darkTheme?"light":"dark"} onClick={()=>setDarkTheme(!darkTheme)} size="sm">
                        {darkTheme?"Light mode":"Dark mode"}
                    </Button>
                </Nav>
        </Navbar>
    );
}

export default NavBar;