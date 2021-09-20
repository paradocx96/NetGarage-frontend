import React from "react";
import {Card, Col, Form, Row} from "react-bootstrap";
import {Button} from "react-bootstrap";
import Toast1 from "../../../Toasts/Toast1";
import PhoneChipsetService from "../../../../services/PhoneChipsetService";
import Toast2 from "../../../Toasts/Toast2";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";

class AddChipset extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.showNotAvailable = false;

        this.onChange = this.onChange.bind(this);
        this.submitChipset = this.submitChipset.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.checkBrandModelAvailability = this.checkBrandModelAvailability.bind(this);

    }

    initialState={
        brandAndModel:'',
        cpu:'',
        gpu:'',
        lithography:'',
        isBrandModelAvailable:''
    }


    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    submitChipset = async (event) => {
        event.preventDefault();

        await this.checkBrandModelAvailability();
        console.log("Availability : ", this.state.isBrandModelAvailable );

        if(this.state.isBrandModelAvailable == 'available'){

            let chipset ={
                brandmodel : this.state.brandAndModel,
                cpu : this.state.cpu,
                gpu:  this.state.gpu,
                lithography: this.state.lithography
            }

            await PhoneChipsetService.addChipset(chipset)
                .then(response => response.data)
                .then((data) => {
                    if (data != null){
                        console.log("Added chipset with id : ", data.id);
                        this.setState({"show":true});
                        setTimeout(() => this.setState({"show":false}),3000);
                    }
                }).catch(error => {
                    console.log("Error in adding chipset. Error : ",error);
                });

            this.resetForm();

        }
        else if(this.state.isBrandModelAvailable == 'notAvailable') {

            this.setState({"showNotAvailable":true});
            setTimeout(() => this.setState({"showNotAvailable":false}),3000);

        }
        else{
            console.log("Some other error");
        }



    }

    checkBrandModelAvailability = async () => {
        await PhoneChipsetService.isBrandModelAvailable(this.state.brandAndModel)
            .then(response => response.data)
            .then((data) => {
                if (data == true){
                    this.setState({isBrandModelAvailable: 'available'})
                }
                else {
                    this.setState({isBrandModelAvailable: 'notAvailable'})
                }
            }).catch(error => {
                console.log("Error in getting availability. Error : ", error);
        })
    }

    resetForm =() => {

        //setting state to initial state
        this.setState( {brandAndModel:''});
        this.setState( {cpu:''});
        this.setState( {gpu:''});
        this.setState( {lithography:''});
    }

    render() {
        const {brandAndModel, cpu, gpu, lithography} =  this.state;
        return (

            <div>
                <NavigationBarDashboard />
            <div className={'container'}>

                <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "Chipset added successfully",
                            type: 'success'
                        }}
                    />

                </div>

                <div style={{"display": this.state.showNotAvailable ? "block" : "none"}}>

                    <Toast2

                        children={{
                            show: this.state.showNotAvailable,
                            message: "Chipset brand and model is already taken",
                            type: 'warning'
                        }}
                    />

                </div>

                <h1>Add Chipset</h1>
                <Form onSubmit={this.submitChipset} onReset={this.resetForm}>
                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Add chipset</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Brand and model</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    name={'brandAndModel'}
                                    placeholder={'Enter brand and model'}
                                    value={brandAndModel}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>CPU</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    name={'cpu'}
                                    placeholder={'Enter the CPU'}
                                    value={cpu}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>GPU</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    name={'gpu'}
                                    placeholder={'Enter the GPU'}
                                    value={gpu}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Lithography</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    name={'lithography'}
                                    placeholder={'Enter the lithography'}
                                    value={lithography}
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
                                    <Button type={'submit'} className={'btn btn-success'}>Add Chipset</Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Form>

            </div>
            </div>
        );
    }

}
export default AddChipset;