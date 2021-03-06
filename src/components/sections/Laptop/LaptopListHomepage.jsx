import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../../../assets/style/laptop/LaptopList.css';

import ServiceLaptop from "../../../services/ServiceLaptop";

class LaptopListHomepage extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        laptopList: []
    }

    componentDidMount = async () => {
        await ServiceLaptop.getLaptopByStatus('Activated')
            .then(response => response.data)
            .then((data) => {
                this.setState({laptopList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    divBack = {
        backgroundColor: '#263238',
        color: 'white'
    }

    divLap = {
        color: 'black',
        width: '25%'
    }

    divBox = {
        height: '50px'
    }

    divBoxSmall = {
        height: '10px'
    }

    render() {
        return (
            <Container style={this.divBack}>
                <div style={this.divBox}/>
                <div id="laptopList">
                    {
                        this.state.laptopList.length === 0 ?
                            <p>Loading...</p>
                            :
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
                                // <Card style={this.divLap} key={laptop.id}>
                                //     <Card.Body>
                                //         <Card.Img variant="top" src={LaptopArt}/>
                                //         <Card.Title>{laptop.brand + ' ' + laptop.name + ' ' + laptop.graphicmodel}</Card.Title>
                                //     </Card.Body>
                                // </Card>
                            ))
                    }
                </div>
                <div style={this.divBox}/>
            </Container>
        );
    }
}

export default LaptopListHomepage;