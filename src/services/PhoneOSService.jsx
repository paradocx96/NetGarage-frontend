import React, {Component} from "react";
import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:5000";
const OS_URL = "/api/phone/os/";

class PhoneOSService extends Component{
    constructor(props) {
        super(props);

    }

    //method to add an OS
    addOS(os){
        return axios.post(BACKEND_BASE_URL + OS_URL + "addOS",os);
    }

    //method to get all OS
    getAllOSes(){
        return axios.get(BACKEND_BASE_URL + OS_URL + "getAllOS");
    }

    //method to get OS by ID
    getOSById(id){
        return axios.get(BACKEND_BASE_URL + OS_URL + "getOSById/" + id);
    }

    //method to delete OS
    deleteOS(id){
        return axios.delete(BACKEND_BASE_URL + OS_URL + "deleteOS/" + id);
    }

    //method to update OS
    updateOS(os){
        return axios.put(BACKEND_BASE_URL + OS_URL + "update",os);
    }

    //method to check OS availability
    isOSAvailable(osName){
        return axios.get(BACKEND_BASE_URL + OS_URL + "isOsNameAvailable/" + osName);
    }

}

export default new PhoneOSService();