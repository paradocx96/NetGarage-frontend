import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Container, Form, ProgressBar} from "react-bootstrap";
import {storage} from '../../../firebase/FirebaseLaptop';
import CommonCheckAuth from "../../../services/CommonCheckAuth";
import ServiceLaptopImage from "../../../services/ServiceLaptopImage";
import ServiceLaptop from "../../../services/ServiceLaptop";

import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";
import LaptopImageUploadBodyWall from "../../layouts/Laptop/LaptopImageUploadBodyWall";
import FooterAdmin from "../../layouts/Footer/FooterAdmin";

function LaptopImageUpload() {

    const divBox = {
        height: '50px'
    }

    const divBack = {
        backgroundColor: '#212121'
    }

    const conBox = {
        color: '#ffffff',
        backgroundColor: '#263238'
    }

    const params = useParams();
    console.log(params);

    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');

    useEffect(async () => {
        await ServiceLaptop.getLaptopObjectById(params.lid)
            .then(response => {
                setBrand(response.data.brand);
                setName(response.data.name);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    });

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

    const handleSaveImageAPI = async () => {
        const value = {
            lid: params.lid,
            link: urls,
            user: 'Admin'
        }

        await ServiceLaptopImage.postLaptopImage(value)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    }

    return (
        <div style={divBack}>
            <NavigationBarDashboard/>
            <LaptopImageUploadBodyWall/>
            <Container style={conBox}>
                <div style={divBox}/>
                <h5>ID : {params.lid}</h5>
                <h5>Name : {brand + ' ' + name}</h5>
                <ProgressBar animated now={progress}/>
                <br/>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Select Laptops Images</Form.Label><br/>
                    <Form.Control type="file" required multiple onChange={handleChange}/>
                </Form.Group>
                <Button onClick={handleUpload} className={'btn-primary'}>Upload</Button>{' '}
                <Button onClick={handleSaveImageAPI} className={'btn-success'}>Save</Button>
                <br/>

                {/*<div>*/}
                {/*    {urls.map((url, i) => (*/}
                {/*        <div key={i}>*/}
                {/*            <a href={url} target="_blank">*/}
                {/*                {url}*/}
                {/*            </a>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
                {/*<br/>*/}

                <div>
                    {urls.map((url, i) => (
                        <img
                            key={i}
                            style={{width: "500px"}}
                            src={url || "http://via.placeholder.com/300"}
                            alt="firebase-image"
                        />
                    ))}
                </div>
                <div style={divBox}/>
            </Container>
            <div style={divBox}/>
            <FooterAdmin/>
        </div>
    );
}

export default CommonCheckAuth(LaptopImageUpload);