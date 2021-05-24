import {useState, useEffect} from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function SearchBar({address, updateAddress}) {

    return(
        <Row style={{margin: 10}}>
            <Col>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="street address">Address</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" value={address.street} 
                        onChange={(e) => updateAddress({...address, street:e.target.value})} aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
            </Col>
            <Col>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="city">City</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" value={address.city} onChange={(e) => updateAddress({...address, city:e.target.value})} aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
            </Col>
            <Col>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="state">State</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" value={address.state} onChange={(e) => {
                        if(e.target.value.length<=2){
                            updateAddress({...address, state:e.target.value});
                        }
                    }} aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
            </Col>
        </Row>
    );
}

export default SearchBar;