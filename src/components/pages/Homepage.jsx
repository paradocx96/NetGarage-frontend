import React, {Component} from 'react';
import {Container} from "react-bootstrap";

import Footer from "../layouts/Footer/Footer";
import LaptopSlick from "../sections/Homepage/LaptopSlick";
import PhoneSlick from "../sections/Homepage/PhoneSlick";
import HomepageCarousel from "../sections/Homepage/HomepageCarousel";

class Homepage extends Component {

    textStyle = {
        textAlign: 'center'
    }

    render() {
        return (
            <div>
                <HomepageCarousel/>
                <Container>
                    <section style={this.textStyle} className={'pt-5 pb-5'}>
                        <h2>LATEST LAPTOPS</h2>
                        <LaptopSlick/>
                    </section>
                    <section style={this.textStyle} className={'pt-5 pb-5'}>
                        <h2>LATEST PHONES</h2>
                        <br/>
                        <PhoneSlick/>
                    </section>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default Homepage;
