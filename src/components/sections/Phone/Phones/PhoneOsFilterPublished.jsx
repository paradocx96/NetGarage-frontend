import React from "react";
import PhoneOSService from "../../../../services/PhoneOSService";
import PhoneService from "../../../../services/PhoneService";
import {Button, Card, Col, Form, Row} from "react-bootstrap";

class PhoneOsFilterPublished extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.onChange = this.onChange.bind(this);
        this.submitFilter = this.submitFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);

    }
    initialState = {
        osList:[],
        os:'',
        phones:[],
        filterInitiated:false
    }

    componentDidMount() {
        PhoneOSService.getAllOSes()
            .then(response => response.data)
            .then((data) => {
                this.setState({osList:data});
                this.setState({os:data[0].name});
            }).catch(error => {
            console.log("Cannot get all Oses. Error: ",error);
        })
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    submitFilter = async (event) => {
        event.preventDefault();
        this.setState({filterInitiated:true});

        await PhoneService.getPublishedPhonesByOS(this.state.os)
            .then(response => response.data)
            .then((data) => {
                this.setState({phones:data});
            }).catch(error => {
                console.log("cannot get phones for OS. Error: ",error);
            })
    }

    resetFilter = (event) => {
        event.preventDefault();
        this.setState({phones:[]});
    }

    navigateToSinglePhoneView = (event, id) =>{
        window.location = `/phones/viewSinglePhone/${id}`;
    }

    render() {
        const {os, osList, phones} = this.state;
        return (
            <div className={'container-fluid'}>

                <br/>
                <h3>Filter By OS</h3>
                <Form onReset={this.resetFilter} onSubmit={this.submitFilter}>
                    <Form.Group as={Row}>
                        <Col sm="7">

                            <Form.Control
                                as={'select'}
                                required
                                name={'os'}
                                value={os}
                                onChange={this.onChange}>

                                >

                                {
                                    this.state.osList.length === 0?
                                        <option>No Brands !</option>:
                                        this.state.osList.map( (e) => (
                                            <option value={e.name}>
                                                {e.name}
                                            </option>
                                        ))
                                }

                            </Form.Control>
                        </Col>

                        <Col sm={'1'}>
                            <Button type={'submit'}  className={'btn btn-primary btn-sm'}>
                                Filter
                            </Button>
                        </Col>

                        <Col sm={'2'}>
                            <Button type={'reset'}  className={'btn btn-secondary btn-sm'}>
                                Reset
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>

                <br/>

                {
                    this.state.filterInitiated === false ?
                        <h5>Filter to get results</h5>:
                        this.state.phones.length === 0?
                            <div>No results</div>:
                        this.state.phones.map((e) => (

                            <div>

                                <Card border={'success'} onClick={event => this.navigateToSinglePhoneView(this,e.id)}>
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <img
                                                    width={'75'} height={'100'}
                                                    src={e.image || "http://via.placeholder.com/300x200"} alt={'firebase-image'}

                                                />
                                            </Col>
                                            <Col>
                                                <h3>{e.brandmodel}</h3>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                <br/>

                            </div>
                        )  )

                }

            </div>
        );
    }


}
export default PhoneOsFilterPublished;