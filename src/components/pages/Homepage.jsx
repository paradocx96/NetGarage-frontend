import React, {Component} from 'react';
import {Container} from "react-bootstrap";

import Footer from "../layouts/Footer/Footer";
import LaptopSlick from "../sections/Homepage/LaptopSlick";

class Homepage extends Component {
    render() {
        return (
            <div>
                <Container>
                    <LaptopSlick/>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default Homepage;
