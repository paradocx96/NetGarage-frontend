import React, {useEffect, useState} from "react";
import {storage} from "../../../../firebase/FirebaseLaptop";
import {Redirect, useParams} from "react-router-dom";
import PhoneService from "../../../../services/PhoneService";
// import data from "bootstrap/js/src/dom/data";
import {Button, Form, ProgressBar} from "react-bootstrap";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";
import ServiceUser from "../../../../services/ServiceUser";
import FooterAdmin from "../../../layouts/Footer/FooterAdmin";

function PhoneMainImageUpload(props){

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [brandmodel, setBrandModel] = useState("");
    const [currentUser, setCurrentUser] = useState(ServiceUser.getCurrentUser());

    useEffect( async  () => {
        await PhoneService.getPhoneById(params.id)
            .then(response => response.data)
            .then((data) => {
                setBrandModel(data.brandmodel);
            }).catch(error => {
                console.log("Cannot get phone by ID. Error: ",error);
            });
        console.log("Current user roles:",currentUser.roles);
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
        await uploadTask.on(
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
                        saveImageUrl(url);
                        console.log(url)
                    });
            }
        );


    };

    const saveImageUrl = (url) =>{

        let imageUpdateRequest={
            id:params.id,
            url:url
        }

        PhoneService.updateImage(imageUpdateRequest)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    console.log("Updated image url");
                    alert("Uploaded the image and Updated image URL");
                }
            })

    }

    return(
        <div>
            {
                currentUser.roles != "ROLE_ADMIN" && currentUser.roles != "ROLE_EDITOR"?
                    <Redirect to={'/no-permission'} />: <div></div>
            }
            <NavigationBarDashboard/>

        <div className={'container-fluid'}>
            <h1>Image Upload</h1>
            <h3>ID : {params.id}</h3>
            <h3>Name : {brandmodel}</h3>

            <ProgressBar animated={true} now={progress} />

            <br/>

            <Form.Group>
                <Form.Label>Select Phone Main Image</Form.Label>
                <Form.Control type="file" required onChange={handleChange}/>

                <br/>
                <Button onClick={handleUpload} className={'btn-primary'}>Upload</Button>
            </Form.Group>

            <br/>
            <img style={{width: "100px"}}
                 src={url || "http://via.placeholder.com/100"}
                 alt="firebase-image" />
        </div>

            <br/> <br/> <br/>
            <FooterAdmin/>
        </div>
    )
}

export default CommonCheckAuth(PhoneMainImageUpload);