import React, {Component} from 'react';
import LaptopBodyWall from "../layouts/Laptop/LaptopBodyWall";
import LaptopListHomepage from "../sections/Laptop/LaptopListHomepage";

class Laptop extends Component {

    divBack = {
        backgroundColor: '#212121'
    }

    render() {
        return (
            <div style={this.divBack}>
                <LaptopBodyWall/>
                <LaptopListHomepage/>
            </div>
        );
    }
}

export default Laptop;
