import React from "react";
import WarningImage from './../../assets/images/Permission/warning.png';
import {Card, Container, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import Footer from "../layouts/Footer/Footer";

class NoPermission extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Container>

                    <img  src={WarningImage} className={'align-items-center w-25'} rounded/>

                    <Card>
                        <Card.Header className={'bg-danger text-white'}>No Permission</Card.Header>
                        <Card.Body className={'bg-warning'}>
                            <Card.Title>No Permission !</Card.Title>
                            <Card.Title>You currently do not have permission to view this resources. Please login with proper permissions.</Card.Title>
                            <Card.Text>If you think this is an error please contact the Administrator.</Card.Text>
                            <Link className={'btn btn-primary'} to={'/'}>Home</Link>
                        </Card.Body>
                    </Card>
                </Container>

                <br/>

                <Footer/>
            </div>
        );
    }

}
export default NoPermission;