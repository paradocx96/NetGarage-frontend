import React from "react";
import PhoneChipsetService from "../../../../services/PhoneChipsetService";
// import data from "bootstrap/js/src/dom/data";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Toast1 from "../../../Toasts/Toast1";
import Toast2 from "../../../Toasts/Toast2";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";

class EditChipset extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.showNotAvailable = false;

        this.onChange = this.onChange.bind(this);
        this.updateChipset = this.updateChipset.bind(this);
        this.checkBrandModelAvailability = this.checkBrandModelAvailability.bind(this);

    }
    initialState={
        id:'',
        chipset: '',
        brandmodel:'',
        cpu:'',
        gpu:'',
        lithography:'',
        isBrandModelAvailable:''
    }

    componentDidMount = async () => {
        let id = this.props.match.params.id;
        this.setState({id: id});
        await PhoneChipsetService.getChipsetById(id)
            .then(response => response.data)
            .then((data) => {
                this.setState({chipset:data});
                console.log("Chipset received. Name : ", data.brandmodel);
                this.setState({brandmodel:data.brandmodel});
                this.setState({cpu:data.cpu});
                this.setState({gpu:data.gpu});
                this.setState({lithography:data.lithography});

            }).catch(error => {
                console.log("Cannot get chipset for id. Error : ",error);
            })
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    updateChipset = async (event) =>{
        event.preventDefault();

        await this.checkBrandModelAvailability();
        console.log("Availability : " , this.state.isBrandModelAvailable);

        if (this.state.isBrandModelAvailable == 'available'){

            let chipset ={
                id:this.state.id,
                brandmodel : this.state.brandmodel,
                cpu : this.state.cpu,
                gpu:  this.state.gpu,
                lithography: this.state.lithography
            }

            await PhoneChipsetService.updateChipset(chipset)
                .then(response => response.data)
                .then((data) => {
                    if (data != null){
                        this.setState({"show":true});
                        setTimeout(() => this.setState({"show":false}),3000);
                    }
                    else {
                        alert("Error when updating the chipset! Try again.");
                    }
                }).catch(error => {
                    console.log("Error in calling update method. Error : ",error);
                })

        }
        else if(this.state.isBrandModelAvailable == 'notAvailable') {
            this.setState({"showNotAvailable":true});
            setTimeout(() => this.setState({"showNotAvailable":false}),3000);
        }
        else {
            console.log("Some other error.");
        }
    }

    checkBrandModelAvailability = async () => {
        await PhoneChipsetService.isBrandModelAvailable(this.state.brandmodel)
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

    render() {
        const {brandmodel, cpu, gpu, lithography} =  this.state;
        return (
            <div>
                <NavigationBarDashboard/>
            <div className={'container-fluid'}>
                {/*<h2>Chipset id : {this.state.id}</h2>*/}
                <h2>Edit Chipset</h2>

                <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "Chipset updated successfully",
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

                <Form onSubmit={this.updateChipset}>
                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-warning'}>Edit Chipset</Card.Header>
                        <Card.Body>
                            <Form.Group >
                                <Form.Label>Brand and model</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    name={'brandmodel'}
                                    placeholder={'Enter brand and model'}
                                    defaultValue={brandmodel}
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
                                    defaultValue={cpu}
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
                                    defaultValue={gpu}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Lithography</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    name={'lithography'}
                                    placeholder={'Enter the GPU'}
                                    defaultValue={lithography}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    <Button type={'submit'} className={'btn btn-success'}>Update Chipset</Button>
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
export default EditChipset;