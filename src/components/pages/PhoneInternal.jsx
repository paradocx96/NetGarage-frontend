import React from "react";
import NavigationBarDashboard from "../layouts/Navigation/NavigationBarDashboard";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class PhoneInternal extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>

                <NavigationBarDashboard />

                <div className={'container-fluid'}>

                    <h1>Phones Admin Panel</h1>
                    <br/><br/>

                    <Row>
                        <Col>
                            <h2>Chipsets</h2>
                            <Link to={'/chipsets/viewAll'}> View All Chipsets</Link> <br />
                            <Link to={'/chipsets/addChipset'}> Add Chipsets</Link> <br />
                            <Link to={'/chipsets/deleteChipset'}> Delete Chipsets</Link> <br />
                        </Col>

                        <Col>
                            <h2>Phone OS</h2>
                            <Link to={'/phone/os/viewAll'}> View All OS</Link> <br />
                            <Link to={'/phone/os/addOS'}> Add OS</Link> <br />
                            <Link to={'/phone/os/deleteOS'}> Delete OS</Link> <br />
                        </Col>

                        <Col>
                            <h2>Phone Brands</h2>
                            <Link to={'/phone/brand/addBrand'}> Add Brand</Link> <br />
                            <Link to={'/phone/brand/viewAll'}> View All Brands</Link> <br />
                            <Link to={'/phone/brand/deleteBrand'}> Delete Brands</Link> <br />
                        </Col>

                        <Col>
                            <h2>Phones</h2>
                            <Link to={'/phones/phoneActions'}> Phone Actions</Link> <br />
                            {/*<Link to={'/phones/viewAllPhonesInternal'}> View All Phones</Link> <br />*/}
                            <Link to={'/phones/viewAllPhonesInternal1'}> View All Phones </Link> <br />
                            <Link to={'/phones/addPhone'}> Add Phone</Link> <br />
                            <Link to={'/phones/deletePhones'}> Delete Phones</Link> <br />
                            {/*<Link to={'/phones/filter/publishedBrandFilter'}> Phone Brand Filter Published</Link> <br />
                            <Link to={'/phones/filter/publishedChipsetFilter'}> Phone Chipset Filter Published</Link> <br />
                            <Link to={'/phones/filter/publishedOsFilter'}> Phone OS Filter Published</Link> <br />*/}
                        </Col>
                    </Row>
                </div>


            </div>
        );
    }

}
export default PhoneInternal;