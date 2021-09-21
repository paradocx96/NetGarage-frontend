import React, {Component} from 'react';
import Slider from "react-slick";
import {Link} from "react-router-dom";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../assets/style/laptop/LaptopList.css';

import ServiceLaptop from "../../../services/ServiceLaptop";

class LaptopSlick extends Component {

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


    render() {

        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div>
                <Slider {...settings}>
                    {
                        this.state.laptopList.length === 0 ?
                            <p>Loading...</p>
                            :
                            this.state.laptopList.map((laptop) => (
                                <Link to={`/laptops-view/` + laptop.id} key={laptop.id} style={{textDecoration: 'none'}}>
                                    <div>
                                        <img style={{height: "230px"}} src={laptop.image} alt={'LaptopImage'}/>
                                        <div>
                                            <h5>{laptop.brand + ' ' + laptop.name + ' ' + laptop.graphicmodel}</h5>
                                        </div>
                                    </div>
                                    {/*<div className="cardItem">*/}
                                    {/*    <img style={{height: "280px"}} src={laptop.image} alt={'LaptopImage'}/>*/}
                                    {/*    <div className="content">*/}
                                    {/*        <h5>{laptop.brand + ' ' + laptop.name + ' ' + laptop.graphicmodel}</h5>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </Link>
                            ))
                    }
                </Slider>
            </div>
        );
    }
}

export default LaptopSlick;