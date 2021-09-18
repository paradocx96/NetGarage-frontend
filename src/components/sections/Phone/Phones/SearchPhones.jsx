import React from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import PhoneService from "../../../../services/PhoneService";

class SearchPhones extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.onChange = this.onChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);

    }
    initialState={
        phones:[],
        phone:'',
        searchInitiated:false
    }

    submitSearch = async (event) => {
        event.preventDefault();

        await PhoneService.getPhoneByName(this.state.phone)
            .then(response => response.data)
            .then((data) => {
                this.setState({phones:data});
                this.setState({searchInitiated:true});
            }).catch(error => {
                console.log("Error in getting phone for name. Error: ",error);
            });


    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    navigateToSinglePhoneView = (event, id) =>{
        window.location = `/phones/viewSinglePhone/${id}`;
    }

    render() {
        const {phones, phone} = this.state;
        return (
            <div className={'container-fluid'}>
                <br/>
                <h3>Search Phones</h3>

                <Form onSubmit={this.submitSearch}>

                    <Row>
                        <Col>

                            <Form.Group>
                                {/*<Form.Label>Search</Form.Label>*/}
                                <Form.Control
                                    required
                                    type={'text'}
                                    placeholder={'Enter Brand and model of the phone'}
                                    name={'phone'}
                                    value={phone}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Col>

                        <Col>

                            <Button type={'submit'} className={'btn btn-success'}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <br/>
                {
                    this.state.searchInitiated === false ?
                        <div>
                            <h5>Search to get results</h5>
                        </div>:
                        this.state.phones.length === 0?
                            <div>No results</div>:
                            this.state.phones.map((e) => (
                                <div>
                                    <Card onClick={event => this.navigateToSinglePhoneView(this,e.id)}>
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
                            ))
                }
            </div>
        );
    }


}
export default SearchPhones;