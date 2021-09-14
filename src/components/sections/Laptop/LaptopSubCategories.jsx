import React, {Component} from 'react';

import LaptopBrand from "./LaptopBrand";
import LaptopProcessor from "./LaptopProcessor";
import LaptopOs from "./LaptopOS";
import LaptopGraphic from "./LaptopGraphic";
import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";
import LaptopSubCategoriesBodyWall from "../../layouts/Laptop/LaptopSubCategoriesBodyWall";
import {Container} from "react-bootstrap";

class LaptopSubCategories extends Component {

    divBack = {
        backgroundColor: '#212121',
        color: '#ffffff',
    }

    render() {
        return (
            <div style={this.divBack}>
                <NavigationBarDashboard/>
                <LaptopSubCategoriesBodyWall/>

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