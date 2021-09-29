import React, {useEffect, useState} from "react";
import PhoneService from "../../../../services/PhoneService";
import {Card, Col, Row} from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";

function ViewAllPhonesInternal2(props){

    const [phones, setPhones] =  useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect( async () => {
        PhoneService.getAllPhones()
            .then(response => response.data)
            .then((data) => {
                setPhones(data);
                //console.log(phones)
            }).catch(error => {
                console.log("Cannot get all phones. Error : ",error);
        })
    })

    const imageClicked = ()  => {
        console.log("Image clicked");
        setIsOpen(true);
    }

    return(
        <div className={'container-fluid'}>
            <h2>All Phones</h2>
            {
                phones.length === 0?
                    <h4>No Phones At this Time</h4>:
                    phones.map((e) => (
                        <Card>
                            <Card.Header>{e.brandmodel}</Card.Header>

                            <Card.Body>

                                <Row>
                                    <Col>

                                        <img
                                            onClick={imageClicked}
                                            width={'150'} height={'200'}
                                            src={e.image || "http://via.placeholder.com/300x200"} alt={'firebase-image'}

                                        />
                                        {
                                            isOpen && (
                                                <Lightbox
                                                    mainSrc={e.image ||"http://via.placeholder.com/300x200"}
                                                    onCloseRequest={() => setIsOpen(false)}

                                                />
                                            )
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
            }
        </div>
    )
}

export default CommonCheckAuth(ViewAllPhonesInternal2);