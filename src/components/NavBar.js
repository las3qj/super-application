import {Navbar, Nav, Button} from 'react-bootstrap';
import {ThemeContext} from './../contexts/themeContext';
import { Link } from "react-router-dom";
import { useContext } from 'react';

function NavBar() {
    const {darkTheme, setDarkTheme} = useContext(ThemeContext);
    return(
        <Navbar bg={darkTheme?"dark":"light"} variant={darkTheme?"dark":"light"}>
            <Navbar.Brand href="/">Super-Application</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><Link style={darkTheme?{color:"white"}:{}} to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link style={darkTheme?{color:"white"}:{}} to="/weather">Weather</Link></Nav.Link>
                    <Nav.Link><Link style={darkTheme?{color:"white"}:{}} to="/restaurants">Restaurants</Link></Nav.Link>
                    <Button variant={darkTheme?"light":"dark"} onClick={()=>setDarkTheme(!darkTheme)} size="sm">
                        {darkTheme?"Light mode":"Dark mode"}
                    </Button>
                </Nav>
        </Navbar>
    );
}

export default NavBar;