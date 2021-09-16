import React from "react";
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";

class Phones extends React.Component{
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={'container-fluid'}>
                <h1>Phones</h1>

                <Row>
                    <Col>
                        <Link to={'/chipsets/viewAll'}> View All Chipsets</Link> <br />
                        <Link to={'/chipsets/addChipset'}> Add Chipsets</Link> <br />
                        <Link to={'/chipsets/deleteChipset'}> Delete Chipsets</Link> <br />
                    </Col>

                    <Col>
                        <Link to={'/phone/os/viewAll'}> View All OS</Link> <br />
                        <Link to={'/phone/os/addOS'}> Add OS</Link> <br />
                        <Link to={'/phone/os/deleteOS'}> Delete OS</Link> <br />
                    </Col>

                    <Col>
                        <Link to={'/phone/brand/addBrand'}> Add Brand</Link> <br />
                        <Link to={'/phone/brand/viewAll'}> View All Brands</Link> <br />
                        <Link to={'/phone/brand/deleteBrand'}> Delete Brands</Link> <br />
                    </Col>

                    <Col>
                        <Link to={'/phones/viewAllPhones'}> View All Phones</Link> <br />
                        <Link to={'/phones/addPhone'}> Add Phone</Link> <br />
                        <Link to={'/phones/deletePhones'}> Delete Phones</Link> <br />
                    </Col>
                </Row>




            </div>
        );
    }

}
export default Phones;