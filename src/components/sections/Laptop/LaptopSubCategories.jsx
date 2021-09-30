import React, {Component} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import CommonCheckAuth from "../../../services/CommonCheckAuth";

import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";
import LaptopSubCategoriesBodyWall from "../../layouts/Laptop/LaptopSubCategoriesBodyWall";
import LaptopBrand from "./LaptopBrand";
import LaptopProcessor from "./LaptopProcessor";
import LaptopOs from "./LaptopOS";
import LaptopGraphic from "./LaptopGraphic";
import FooterAdmin from "../../layouts/Footer/FooterAdmin";

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

                <Tabs defaultActiveKey="brand" id="uncontrolled-tab-example" className="mb-3 m-5">
                    <Tab eventKey="brand" title="Brand">
                        <LaptopBrand/>
                    </Tab>
                    <Tab eventKey="processor" title="Processor">
                        <LaptopProcessor/>
                    </Tab>
                    <Tab eventKey="os" title="OS">
                        <LaptopOs/>
                    </Tab>
                    <Tab eventKey="graphic" title="Graphic">
                        <LaptopGraphic/>
                    </Tab>
                </Tabs>
                <FooterAdmin/>
            </div>
        );
    }
}

export default CommonCheckAuth(LaptopSubCategories);