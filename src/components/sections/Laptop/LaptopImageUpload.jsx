import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {storage} from '../../../firebase/FirebaseLaptop';
import {Button, Container, Form, ProgressBar} from "react-bootstrap";
import {v1 as uuidv1} from 'uuid';

function LaptopImageUpload(props) {
    const params = useParams();
    console.log(params);

    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            // newImage["name"] = uuidv1();
            console.log(newImage["id"]);
            console.log(newImage["name"]);
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

    console.log("images: ", images);
    console.log("urls:", urls);

    const divBox = {
        height: '50px'
    }

    return (
        <Container>

            <div style={divBox}/>

            <ProgressBar animated now={progress}/>
            <br/>

            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Select Laptops Images</Form.Label>
                <Form.Control type="file" multiple onChange={handleChange}/>
            </Form.Group>

            <Button onClick={handleUpload} className={'btn-success'}>Upload</Button>

            <br/>

            <div>
                {urls.map((url, i) => (
                    <div key={i}>
                        <a href={url} target="_blank">
                            {url}
                        </a>
                    </div>
                ))}
            </div>

            <br/>

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

        </Container>
    );
}

export default LaptopImageUpload;