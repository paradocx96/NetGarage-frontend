import React, {Component} from 'react';
import LaptopBodyWall from "../sections/Laptop/LaptopBodyWall";
import LaptopListHomepage from "../sections/Laptop/LaptopListHomepage";

class Laptop extends Component {

    divBack = {
        'background-color': '#212121'
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
