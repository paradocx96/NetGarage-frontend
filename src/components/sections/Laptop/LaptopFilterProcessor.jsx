import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import '../../../assets/style/laptop/LaptopList.css';

import ServiceLaptop from "../../../services/ServiceLaptop";
import ServiceLaptopProcessor from "../../../services/ServiceLaptopProcessor";

class LaptopFilterProcessor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProcessorList: [],
            processor: 'Processor',
            laptopList: '',
            filterInitiated: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.generateLaptopProcessorReport = this.generateLaptopProcessorReport.bind(this);
    }

    componentDidMount = async () => {
        // TODO: GET ALL LAPTOP PROCESSOR
        await ServiceLaptopProcessor.getLaptopProcessor()
            .then(response => response.data)
            .then((data) => {
                this.setState({ProcessorList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    // TODO: Assign values to State variables
    onSelect = (event) => {
        this.setState({processor: event.target.value});
    }

    // TODO: Submit form values
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({filterInitiated: true});

        await ServiceLaptop.getLaptopByProcessorName(this.state.processor)
            .then(response => response.data)
            .then((data) => {
                this.setState({laptopList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    // TODO: Generate Laptop Processor PDF
    generateLaptopProcessorReport = () => {
        const document = new jsPDF();
        const tableColumn = ["BRAND", "NAME", "PROCESSOR", "MEMORY", "YEAR"];
        const tableRows = [];

        this.state.laptopList.map((item) => {
            const value = [
                item.brand,
                item.name + ' ' + item.graphicmodel,
                item.processorname,
                item.ramcapacity,
                item.year
            ];
            tableRows.push(value);
        });

        document.autoTable(tableColumn, tableRows, {startY: 20});

        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

        document.text(`Laptops List for ${this.state.processor}`, 14, 15);
        document.save(`laptops_report_for_${this.state.processor}_${dateStr}.pdf`);
    }

    divBox = {
        color: '#ffffff'
    }

    divBoxNew = {
        height: '50px'
    }

    divBoxNewTwo = {
        height: '20px'
    }

    divSecOne = {
        padding: '20px'
    }

    divSecTwo = {
        minHeight: '400px'
    }

    buttonColor = {
        backgroundColor : '#4CAF50',
        color: 'white'
    }

    render() {
        return (
            <Container style={this.divBox}>
                <div style={this.divBoxNewTwo}/>

                <section style={this.divSecOne}>
                    <h3>Laptop Find By Processor</h3>
                    <div style={this.divBoxNew}/>

                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <Form.Group as={Row} controlId="Name">
                            <Col sm={4}>
                                <Form.Control required as="select"
                                              name={'processor'}
                                              value={this.state.processor}
                                              onChange={this.onSelect}>

                                    <option>Processor</option>
                                    {this.state.ProcessorList.map(item => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Button type="submit" className={'btn'} style={this.buttonColor}>FIND</Button>{'\u00A0'}{'\u00A0'}
                                {
                                    this.state.laptopList.length === 0 ? (
                                        <p> </p>
                                    ) : (
                                        <Button onClick={this.generateLaptopProcessorReport} className={'btn btn-primary'}>Download Report</Button>
                                    )
                                }
                            </Col>
                        </Form.Group>
                    </Form>
                </section>

                <div style={this.divBoxNew}/>

                <section style={this.divSecTwo}>
                    <div id="laptopList">
                        {
                            this.state.filterInitiated === false ?
                                <h5>Filter to get results</h5> :
                                this.state.laptopList.length === 0 ?
                                    <h5>No results</h5> :
                                    this.state.laptopList.map((laptop) => (
                                        <Link to={`/laptops-view/` + laptop.id}
                                              key={laptop.id}
                                              style={{textDecoration: 'none'}}>
                                            <div className="cardItem">
                                                <img style={{height: "280px"}} src={laptop.image} alt={'LaptopImage'}/>
                                                <div className="content">
                                                    <h5>{laptop.brand + ' ' + laptop.name + ' ' + laptop.graphicmodel}</h5>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                        }
                    </div>
                </section>
            </Container>
        );
    }
}

export default LaptopFilterProcessor;