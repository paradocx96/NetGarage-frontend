import React from "react";
import PhoneBrandService from "../../../../services/PhoneBrandService";
import data from "bootstrap/js/src/dom/data";
import Toast1 from "../../../Toasts/Toast1";
import Toast2 from "../../../Toasts/Toast2";
import {Button, Card, Col, Form, Row} from "react-bootstrap";

class AddBrand extends React.Component{

    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.show = false;
        this.state.showNotAvailable = false;

        this.onChange = this.onChange.bind(this);
        this.submitBrand = this.submitBrand.bind(this);
        this.checkBrandNameAvailability = this.checkBrandNameAvailability.bind(this);
        this.resetForm = this.resetForm.bind(this);

    }
    initialState={
        name:'',
        isBrandAvailable:''
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    submitBrand = async (event) => {
        event.preventDefault();
        await this.checkBrandNameAvailability();
        if (this.state.isBrandAvailable == 'available'){

            let brand = {
                name:this.state.name
            }

            await PhoneBrandService.addBrand(brand)
                .then(response => response.data)
                .then((data) => {
                    if (data != null){
                        console.log("Added brand with id : ", data.id);
                        this.setState({"show":true});
                        setTimeout(() => this.setState({"show":false}),3000);
                    }
                }).catch(error => {
                    console.log("Error in adding brand. Error : ",error);
                });

        }
        else if (this.state.isBrandAvailable == 'unavailable'){
            this.setState({"showNotAvailable":true});
            setTimeout(() => this.setState({"showNotAvailable":false}),3000);
        }
        else{
            console.log("Some other error in availability");
        }
    }

    checkBrandNameAvailability= async ()=>{
        await PhoneBrandService.isBrandAvailable(this.state.name)
            .then(response => response.data)
            .then((data) => {
                if(data == true){
                    this.setState({isBrandAvailable:"available"});
                }
                else{
                    this.setState({isBrandAvailable:"unavailable"});
                }
            }).catch(error => {
                console.log("Cannot check brand name availability. Error : ",error);
            })
    }

    resetForm = () =>{
        //setting state to initial state
        this.setState({name:''});
    }


    render() {
        const {name} =  this.state;
        return (
            <div className={'container-fluid'}>

                <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "Brand added successfully",
                            type: 'success'
                        }}
                    />

                </div>

                <div style={{"display": this.state.showNotAvailable ? "block" : "none"}}>

                    <Toast2

                        children={{
                            show: this.state.showNotAvailable,
                            message: "Phone brand and model is already taken",
                            type: 'warning'
                        }}
                    />

                </div>

                <h2>Add Brand</h2>
                <Form onSubmit={this.submitBrand} onReset={this.resetForm}>
                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Add brand</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Add Brand name</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    name={'name'}
                                    placeholder={'Enter new brand'}
                                    value={name}
                                    onChange={this.onChange}
                                />
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    <Button type={'reset'} className={'btn btn-warning'}>Clear</Button>
                                </Col>

                                <Col>
                                    <Button type={'submit'} className={'btn btn-success'}>Add Brand</Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Form>

            </div>
        );
    }


}

export default AddBrand;