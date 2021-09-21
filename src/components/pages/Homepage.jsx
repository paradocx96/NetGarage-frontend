import React, {Component} from 'react';
import {Container} from "react-bootstrap";

import Footer from "../layouts/Footer/Footer";
import LaptopSlick from "../sections/Homepage/LaptopSlick";
import PhoneSlick from "../sections/Homepage/PhoneSlick";

class Homepage extends Component {
    render() {
        return (
            <div>
                <Container>
                    <LaptopSlick/>
                    <PhoneSlick/>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default Homepage;
