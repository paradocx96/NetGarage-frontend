import React from "react";
import PhoneBrandService from "../../../../services/PhoneBrandService";
import {Col, Form, Row, Button, Card} from "react-bootstrap";
import PhoneService from "../../../../services/PhoneService";
import data from "bootstrap/js/src/dom/data";

class PhoneBrandFilterPublished extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.filterChange = this.filterChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitFilter = this.submitFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);

    }
    initialState = {
        brands:[],
        brand:'',
        phones:[],
        filterInitiated:false
    }

    componentDidMount() {
        PhoneBrandService.getAllBrandds()
            .then(response => response.data)
            .then((data) => {
                this.setState({brands:data});
                this.setState({brand:data[0].name});
            }).catch(error => {
                console.log("Cannot get all brands. Error: ",error);
        })
    }

    filterChange = (event) => {
        event.preventDefault();
        console.log("Selected brand : "+ this.state.brand)
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    submitFilter = async (event) => {
        event.preventDefault();
        console.log("Brand : ", this.state.brand);
        this.setState({filterInitiated:true});

        await PhoneService.getPublishedPhonesByBrand(this.state.brand)
            .then(response => response.data)
            .then((data) => {
                this.setState({phones:data});
                console.log("Phones : ", this.state.phones)
            }).catch(error => {
                console.log("cannot get phones for brand. Error: ",error);
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
        const {brand, brands, phones} = this.state;
        return (
            <div className={'container-fluid'}>
                <br/>
                <h3>Filter By Brand</h3>
                <Form onReset={this.resetFilter} onSubmit={this.submitFilter}>
                    <Form.Group as={Row}>
                        <Col sm="7">

                            <Form.Control
                                as={'select'}
                                required
                                name={'brand'}
                                value={brand}
                                onChange={this.onChange}>

                                >

                                {
                                    this.state.brands.length === 0?
                                        <option>No Brands !</option>:
                                        this.state.brands.map( (e) => (
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

export default PhoneBrandFilterPublished;