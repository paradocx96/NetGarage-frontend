import React, {Component} from 'react';

import LaptopBodyWall from "../layouts/Laptop/LaptopBodyWall";
import LaptopListHomepage from "../sections/Laptop/LaptopListHomepage";
import Footer from "../layouts/Footer/Footer";

class Laptop extends Component {

    divBack = {
        backgroundColor: '#212121'
    }

    render() {
        return (
            <div style={this.divBack}>
                <LaptopBodyWall/>
                <LaptopListHomepage/>
                <Footer/>
            </div>
        );
    }
}

export default Laptop;
