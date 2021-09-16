import React, {useEffect, useState} from "react";
import {storage} from "../../../../firebase/FirebaseLaptop";
import {useParams} from "react-router-dom";
import PhoneService from "../../../../services/PhoneService";
import data from "bootstrap/js/src/dom/data";
import {Button, Form, ProgressBar} from "react-bootstrap";

function PhoneMainImageUpload(props){

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [brandmodel, setBrandModel] = useState("");

    useEffect( async  () => {
        await PhoneService.getPhoneById(params.id)
            .then(response => response.data)
            .then((data) => {
                setBrandModel(data.brandmodel);
            })
    });

    const params = useParams();
    console.log(params);

    const imageClicked = ()  => {
        console.log("Image clicked");
        setIsOpen(true);
    }

    const handleChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        const uploadTask = storage.ref(`images/phone/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress =Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {console.log(error)},
            () => {
                storage
                    .ref("images/phone/")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //console.log(url);
                        setUrl(url);
                        console.log(url)
                    });
            }
        );
    };

    const saveImageUrl = (url) =>{

    }

    return(
        <div className={'container-fluid'}>
            <h1>Image Upload</h1>
            <h3>ID : {params.id}</h3>
            <h3>Name : {brandmodel}</h3>

            <ProgressBar animated={true} now={progress} />

            <Form.Group>
                <Form.Label>Select Phone Main Image</Form.Label>
                <Form.Control type="file" required onChange={handleChange}/>

                <br/>
                <Button onClick={handleUpload} className={'btn-primary'}>Upload</Button>
            </Form.Group>
        </div>
    )
}

export default PhoneMainImageUpload;