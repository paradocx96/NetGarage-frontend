import React, {useState} from 'react';
import {storage} from "../../../firebase/FirebaseLaptop";
import {Button, Col, Container, Form, ProgressBar, Row} from "react-bootstrap";

import ServiceLaptopImage from "../../../services/ServiceLaptopImage";
import ServiceUser from "../../../services/ServiceUser";

function LaptopImageUploadEdit({LaptopId}) {

    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const [currentUser, setCurrentUser] = useState(ServiceUser.getCurrentUser());

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        const promises = [];
        images.map((image) => {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    await storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then((urls) => {
                            setUrls((prevState) => [...prevState, urls]);
                        });
                }
            );
        });

        Promise.all(promises)
            .then(() => console.log("All images uploaded"))
            .catch((err) => console.log(err));
    };

    const handleUpdateImageAPI = async () => {
        const value = {
            lid: LaptopId,
            link: urls,
            user: currentUser.username
        }

        console.log(value);

        await ServiceLaptopImage.updateLaptopImageByLaptopId(value)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }

    return (
        <div>
            <h3>Upload New Gallery Images</h3>
            <Container>
                <Row>
                    <Col sm={6}>
                        <Form>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Select Laptops Images</Form.Label><br/>
                                <Form.Control type="file" required multiple onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="ProgressBar" className="mb-3">
                                <ProgressBar animated now={progress}/>
                            </Form.Group>
                            <Form.Group controlId="ButtonsList" className="mb-3">
                                <Button onClick={handleUpload} className={'btn-primary'}>Upload</Button>{'\u00A0'}
                                <Button onClick={handleUpdateImageAPI} className={'btn-success'}>Save</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm={6}>
                        <div>
                            {urls.map((url, i) => (
                                <img
                                    key={i}
                                    style={{width: "100px"}}
                                    src={url || "https://via.placeholder.com/50"}
                                    alt="New-Laptop-Images"
                                />
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LaptopImageUploadEdit;