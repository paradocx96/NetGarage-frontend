import React from 'react';
import {Button, Container, Form, ProgressBar} from "react-bootstrap";

import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";
import {useParams} from "react-router-dom";

function LaptopMainImageUpload(props) {

    const divBox = {
        height: '50px'
    }

    const divBack = {
        backgroundColor: '#212121'
    }

    const conBox = {
        color: '#ffffff',
        backgroundColor: '#263238'
    }

    const params = useParams();
    console.log(params);

    return (
        <div style={divBack}>
            <NavigationBarDashboard/>

            <Container style={conBox}>
                <div style={divBox}/>

                <h5>ID : {params.lid}</h5>



                <div style={divBox}/>
            </Container>
            <div style={divBox}/>
        </div>
    );
}

export default LaptopMainImageUpload;