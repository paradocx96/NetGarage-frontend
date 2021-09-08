import React, {useState} from 'react';
import {Button, Container, Form, ProgressBar} from "react-bootstrap";
import {storage} from '../../../firebase/FirebaseLaptop';
import {useParams} from "react-router-dom";

import NavigationBarDashboard from "../../layouts/Navigation/NavigationBarDashboard";

function LaptopMainImageUpload(props) {

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

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

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

    console.log("image: ", image);

    return (
        <div style={divBack}>
            <NavigationBarDashboard/>

            <Container style={conBox}>
                <div style={divBox}/>

                <h5>ID : {params.lid}</h5>



                <div style={divBox}/>
            </Container>
            <div style={divBox}/>
        </div>
    );
}

export default LaptopMainImageUpload;