import React, {Component} from 'react';
import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";

import Image1 from './../../../assets/images/Homepage/Phone.jpg';
import Image2 from './../../../assets/images/Homepage/Laptop.jpg';

class HomepageCarousel extends Component {

    render() {
        return (
            <div>
                <Carousel variant="light">
                    <Carousel.Item>
                        <Link to={`/phones/filter/publishedFilterMain`}>
                            <img
                                className="d-block w-100"
                                src={Image1}
                                alt="First slide"
                            />
                        </Link>
                    </Carousel.Item>

                    <Carousel.Item>
                        <Link to={`/laptops/`}>
                            <img
                                className="d-block w-100"
                                src={Image2}
                                alt="Second slide"
                            />
                        </Link>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default HomepageCarousel;