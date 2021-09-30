import React, {Component} from 'react';
import NavigationBarDashboard from "../layouts/Navigation/NavigationBarDashboard";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <NavigationBarDashboard/>
                <div  className={'container-fluid'}>
                    <h1>Dashboard</h1>

                    <Row>
                        <Col>
                            <Card border={'primary'}>
                                <Card.Body>
                                    <h2>Phones</h2>
                                    <Link to={'/phoneInternal'}> Phones</Link> <br />
                                    <Link to={'/phones/addPhone'}> Add Phone</Link> <br />

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card border={'success'}>
                                <Card.Body>
                                    <h2>Laptops</h2>
                                    <Link to={'/laptops-admin'}> Laptops</Link> <br />
                                    <Link to={'/laptops-admin-add'}> Add Laptops</Link> <br />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>
        );
    }
}

export default Dashboard;