import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PhoneService from "../../../services/PhoneService";

class PhoneSlick extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        phoneList: []
    }

    componentDidMount = async () => {

        PhoneService.getPublishedPhones()
            .then(response => response.data)
            .then((data) => {
                this.setState({phoneList : data});
            }).catch(error => {
                console.log("Error in getting published phones. Error : ", error);
        })

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
                        this.state.phoneList.length === 0?
                            <p>Loading...</p>:
                            this.state.phoneList.map((e) => (
                                <Link to={'/phones/viewSinglePhone/' + e.id} key={e.id}
                                      style={{textDecoration: 'none'}}>
                                    <div>
                                        <center>
                                            <img style={{height: "230px"}} src={e.image} alt={'PhoneImage'}/>
                                        </center>

                                        <div>
                                            <h5>{ e.brandmodel }</h5>
                                        </div>
                                    </div>
                                </Link>
                            ))
                    }

                </Slider>
            </div>
        );
    }
}

export default PhoneSlick;