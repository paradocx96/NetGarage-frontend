import React, {Component} from 'react';
import {Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import CommonCheckAuth from "../../services/CommonCheckAuth";

import NavigationBarDashboard from "../layouts/Navigation/NavigationBarDashboard";
import FooterAdmin from "../layouts/Footer/FooterAdmin";

class Dashboard extends Component {

    headerDiv = {
        paddingTop: '20px',
        textAlign: 'center'
    }

    backDiv = {
        backgroundColor: '#263238',
        color: 'white',
    }

    divSection = {
        color: '#000000',
        margin: '20px',
        padding: '20px',
        borderRadius: '25px',
        backgroundColor: '#212121',
        minHeight: '490px',
        textAlign: 'center'
    }

    render() {
        return (
            <div style={this.backDiv}>
                <NavigationBarDashboard/>
                <Container>
                    <div>
                        <section style={this.headerDiv}>
                            <h1>DASHBOARD</h1>
                        </section>

                        <section style={this.divSection}>
                            <div className={'row'}>
                                <div className={'col'}>
                                    <Link to={'/phones/addPhone'} style={{textDecoration: 'none'}}>
                                        <Card className={''}>
                                            <Card.Body>
                                                <Card.Title>ADD NEW PHONE</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                                <div className={'col'}>
                                    <Link to={'/laptops-admin-add'} style={{textDecoration: 'none'}}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>ADD NEW LAPTOP</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                                <div className={'col'}>
                                    <Link to={'/'} style={{textDecoration: 'none'}}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>CHECK USERS</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                            <div className={'row pt-3'}>
                                <div className={'col'}>
                                    <Link to={'/phoneInternal'} style={{textDecoration: 'none'}}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>ALL PHONE</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                                <div className={'col'}>
                                    <Link to={'/laptops-admin'} style={{textDecoration: 'none'}}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>ALL LAPTOP</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                                <div className={'col'}>
                                    <Link to={'/view-all-users'} style={{textDecoration: 'none'}}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>CHECK USERS</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </Container>
                <FooterAdmin/>
            </div>
        );
    }
}

export default CommonCheckAuth(Dashboard);