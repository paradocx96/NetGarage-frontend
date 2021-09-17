import React from "react";
import PhoneService from "../../../../services/PhoneService";
import {Card, Col, Row} from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';

class ViewAllPhonesInternal extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.isOpen = false;

    }
    initialState={
        phones:[]
    }

    componentDidMount() {
        PhoneService.getAllPhones()
            .then(response => response.data)
            .then((data) => {
                this.setState({phones: data});
            }).catch(error => {
            console.log("Error in getting all phones. Error: ",error);
        })
    }

    navigateToSinglePhoneView = (event, id) =>{
        window.location = `/phones/viewSinglePhone/${id}`;
    }


    render() {
        return (
            <div className={'container-fluid'}>
                <h2>All Phones</h2>
                {
                    this.state.phones.length === 0?
                        <h3>No records at this time</h3>:
                        this.state.phones.map((e) => (
                            <div>
                            <Card className={'bg-transparent'}
                                  onClick={event => this.navigateToSinglePhoneView(this,e.id)}>
                                <Card.Header className={'bg-success text-white'}>{e.brandmodel}</Card.Header>

                                <Card.Body>

                                    <Row>
                                        <Col>
                                            <img
                                                width={'150'} height={'200'}
                                                src={e.image || "http://via.placeholder.com/300x200"} alt={'firebase-image'}

                                            />
                                        </Col>

                                        <Col>
                                            <Card.Header>Display</Card.Header>
                                            <Card.Body>{e.displaysize}</Card.Body>

                                            <Card.Header>Chipset</Card.Header>
                                            <Card.Body>{e.chipset}</Card.Body>
                                        </Col>
                                        <Col>
                                            <Card.Header>Storage</Card.Header>
                                            <Card.Body>{e.memorystorage}</Card.Body>

                                            <Card.Header>Battery</Card.Header>
                                            <Card.Body>{e.batterytype}</Card.Body>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                                <br/>
                            </div>
                        ))
                }
            </div>
        );
    }


}

export default ViewAllPhonesInternal;