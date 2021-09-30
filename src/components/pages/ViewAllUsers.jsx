import React, {Component} from 'react';
import ViewAllUsersSection from "../sections/UserPDFGenerator/ViewAllUsers";
import FooterAdmin from "../layouts/Footer/FooterAdmin";
import NavigationBarDashboard from "../layouts/Navigation/NavigationBarDashboard";
import {Container} from "react-bootstrap";

class ViewAllUsers extends Component {

    divBox = {
        height: '50px'
    }

    divBack = {
        backgroundColor: '#212121'
    }

    render() {
        return (
            <div style={this.divBack}>
                <NavigationBarDashboard/>
                <div style={this.divBox}/>
                <Container>
                    <ViewAllUsersSection/>
                </Container>
                <div style={this.divBox}/>
                <div style={this.divBox}/>
                <FooterAdmin/>
            </div>
        );
    }
}

export default ViewAllUsers;