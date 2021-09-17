import React from "react";
import PhoneChipsetService from "../../../../services/PhoneChipsetService";
import PhoneService from "../../../../services/PhoneService";
import {Button, Card, Col, Form, Row} from "react-bootstrap";

class PhoneChipsetFilterPublished extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.onChange = this.onChange.bind(this);
        this.submitFilter = this.submitFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }
    initialState = {
        chipsets:[],
        chipset:'',
        phones:[],
        filterInitiated:false
    }

    componentDidMount() {
        PhoneChipsetService.getAllChipsets()
            .then(response => response.data)
            .then((data) => {
                this.setState({chipsets:data});
                this.setState({chipset:data[0].brandmodel});
            }).catch(error => {
                console.log("Cannot get all chipsets. Error: ",error);
        })
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    submitFilter = async (event) =>{
        event.preventDefault();
        this.setState({filterInitiated:true});

        await PhoneService.getPublishedPhonesByChipset(this.state.chipset)
            .then(response => response.data)
            .then((data) => {
                this.setState({phones:data});
            }).catch(error => {
                console.log("cannot get phones for chipset. Error: ",error);
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
        const {chipset, chipsets, phones} = this.state;
        return (
            <div className={'container-fluid'}>
                <br/>
                <h3>Filter By Chipset</h3>

                <Form onReset={this.resetFilter} onSubmit={this.submitFilter}>

                    <Form.Group as={Row}>
                        <Col sm="7">
                            <Form.Control
                                as={'select'}
                                required
                                name={'chipset'}
                                value={chipset}
                                onChange={this.onChange}

                            >
                                {
                                    this.state.chipsets.length === 0?
                                        <option>No Chipsets</option>:
                                        this.state.chipsets.map((e) => (
                                            <option value={e.brandmodel}>
                                                {e.brandmodel}
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
                    this.state.filterInitiated === false?
                        <h5>Filter to get results</h5>:
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
                        )  )
                }

            </div>
        );
    }


}
export default PhoneChipsetFilterPublished;