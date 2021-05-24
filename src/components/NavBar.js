import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

function NavBar() {
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Super-Application</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/weather">Weather</Link></Nav.Link>
                    <Nav.Link><Link to="/restaurants">Restaurants</Link></Nav.Link>
                </Nav>
        </Navbar>
    );
}

export default NavBar;