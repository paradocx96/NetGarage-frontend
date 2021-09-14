import React, {Component} from 'react';
import LaptopBrand from "./LaptopBrand";
import LaptopProcessor from "./LaptopProcessor";
import LaptopOs from "./LaptopOS";
import LaptopGraphic from "./LaptopGraphic";
import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";
import LaptopAddBodyWall from "../../layouts/Laptop/LaptopAddBodyWall";

class LaptopSubCategories extends Component {

    divBack = {
        backgroundColor: '#212121',
        color: '#ffffff',
    }

    render() {
        return (
            <div style={this.divBack}>
                <NavigationBarDashboard/>

                <h1>Laptop Sub Categories</h1>

                <section>
                    <LaptopBrand/>
                </section>

                <section>
                    <LaptopProcessor/>
                </section>

                <section>
                    <LaptopOs/>
                </section>

                <section>
                    <LaptopGraphic/>
                </section>
            </div>
        );
    }
}

export default LaptopSubCategories;