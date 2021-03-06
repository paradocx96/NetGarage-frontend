import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import '../../../assets/style/laptop/LaptopList.css';

import ServiceLaptop from "../../../services/ServiceLaptop";

class LaptopFilterRam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ram: 'RAM Capacity',
            laptopList: '',
            filterInitiated: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.generateLaptopRAMReport = this.generateLaptopRAMReport.bind(this);
    }

    // TODO: Assign values to State variables
    onSelect = (event) => {
        this.setState({ram: event.target.value});
    }

    // TODO: Submit form values
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({filterInitiated: true});

        await ServiceLaptop.getLaptopByRamCapacity(this.state.ram)
            .then(response => response.data)
            .then((data) => {
                this.setState({laptopList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    // TODO: Generate Laptop ARM PDF
    generateLaptopRAMReport = () => {
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

        document.text(`Laptops List for ${this.state.ram} RAM Capacity`, 14, 15);
        document.save(`laptops_report_for_${this.state.ram}_ram_capacity_${dateStr}.pdf`);
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
                    <h3>Laptop Find By RAM Capacity</h3>
                    <div style={this.divBoxNew}/>

                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <Form.Group as={Row} controlId="Name">
                            <Col sm={4}>
                                <Form.Control required as="select"
                                              name={'ram'}
                                              value={this.state.ram}
                                              onChange={this.onSelect}>
                                    <option>RAM Capacity</option>
                                    <option>1TB</option>
                                    <option>512GB</option>
                                    <option>256GB</option>
                                    <option>128GB</option>
                                    <option>64GB</option>
                                    <option>32GB</option>
                                    <option>16GB</option>
                                    <option>8GB</option>
                                    <option>4GB</option>
                                </Form.Control>
                            </Col>
                            <Col>
                                <Button type="submit" className={'btn'} style={this.buttonColor}>FIND</Button>{'\u00A0'}{'\u00A0'}
                                {
                                    this.state.laptopList.length === 0 ? (
                                        <p> </p>
                                    ) : (
                                        <Button onClick={this.generateLaptopRAMReport} className={'btn btn-primary'}>Download Report</Button>
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

export default LaptopFilterRam;