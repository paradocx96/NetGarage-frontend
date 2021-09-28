import React, {Component} from 'react';
import {Container} from "react-bootstrap";

import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";
import ServiceLaptopImage from "../../../services/ServiceLaptopImage";
import ServiceLaptop from "../../../services/ServiceLaptop";
import FooterAdmin from "../../layouts/Footer/FooterAdmin";

class LaptopImageViewAdmin extends Component {

    divBox = {
        height: '20px'
    }

    divBack = {
        backgroundColor: '#212121'
    }

    conBox = {
        color: '#ffffff',
        backgroundColor: '#263238'
    }

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            lid: '',
            lName: '',
            lBrand: '',
            imageList: []
        }
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        this.setState({
            lid: params.lid
        });

        setTimeout(() => {
            console.log('LID : ', this.state.lid);
            ServiceLaptopImage.getLaptopImageByLaptopId(this.state.lid)
                .then(response => {
                    console.log(response.data.link);
                    this.setState({
                        imageList: response.data.link
                    })
                })
                .catch(function (error) {
                    console.log(error.message);
                });

            ServiceLaptop.getLaptopObjectById(params.lid)
                .then(response => {
                    this.setState({
                        lName: response.data.name,
                        lBrand: response.data.brand
                    });
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        }, 1000);
    }

    render() {
        return (
            <div style={this.divBack}>
                <NavigationBarDashboard/>
                <Container style={this.conBox}>

                    <div style={this.divBox}/>

                    <h5>ID : {this.state.lid}</h5>
                    <h5>Name : {this.state.lBrand + ' ' + this.state.lName}</h5>

                    <div>
                        {
                            this.state.imageList.length === 0 ?
                                <h5>No results</h5> :
                                this.state.imageList.map((url, i) => (
                                    <img
                                        key={i}
                                        style={{width: "500px"}}
                                        src={url || 'http://via.placeholder.com/300'}
                                        alt="firebase-image"
                                    />
                                ))
                        }
                    </div>
                </Container>
                <div style={this.divBox}/>
                <FooterAdmin/>
            </div>
        );
    }
}

export default LaptopImageViewAdmin;