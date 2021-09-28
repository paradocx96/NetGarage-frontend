import React, {useEffect, useState} from 'react';
import {Button, Container, Form, ProgressBar} from "react-bootstrap";
import {storage} from '../../../firebase/FirebaseLaptop';
import {useParams} from "react-router-dom";
import CommonCheckAuth from "../../../services/CommonCheckAuth";
import ServiceLaptop from "../../../services/ServiceLaptop";

import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";
import LaptopImageUploadBodyWall from "../../layouts/Laptop/LaptopImageUploadBodyWall";
import FooterAdmin from "../../layouts/Footer/FooterAdmin";

function LaptopMainImageUpload(props) {

    // TODO: CUSTOM STYLE
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

    // GETTING LAPTOP ID
    const params = useParams();
    console.log(params);

    // INITIALIZED VARIABLES
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');

    // GETTING LAPTOP DETAILS
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

    // IMAGE UPLOAD METHODS
    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    // UPLOAD IMAGE TO FIREBASE
    const handleUpload = () => {
        const uploadTask = storage.ref(`main-images/${image.name}`).put(image);
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
                    .ref("main-images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                    });
            }
        );
    };

    // SAVE IMAGE LINK IN BACKEND API
    const handleSaveMainImageAPI = async () => {
        const value = {
            id: params.lid,
            image: url
        }

        await ServiceLaptop.updateLaptopImage(value)
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
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Select Laptop Main Image</Form.Label><br/>
                    <Form.Control type="file" required onChange={handleChange}/>
                </Form.Group>
                <Button onClick={handleUpload} className={'btn-primary'}>Upload</Button>{' '}
                <Button onClick={handleSaveMainImageAPI} className={'btn-success'}>Save</Button>
                <br/>
                <br/>

                <img style={{width: "500px"}}
                     src={url || "https://via.placeholder.com/100"}
                     alt="firebase-image" />

                <div style={divBox}/>
            </Container>
            <div style={divBox}/>
            <FooterAdmin/>
        </div>
    );
}

export default CommonCheckAuth(LaptopMainImageUpload);