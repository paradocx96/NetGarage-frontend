import React, {Component} from "react";
import axios from "axios";
import connection from "./connecction.json";

const BACKEND_BASE_URL = "http://"+ connection.ipAddress +":" +connection.port;
const PHONE_URL = "/api/phone/phones/";

class PhoneService extends Component{
    constructor(props) {
        super(props);

    }
    //method to add phones
    addPhone(phone){
        return axios.post(BACKEND_BASE_URL + PHONE_URL + "addPhone",phone);
    }
    //method to get all phone entries
    getAllPhones(){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "getAllPhones");
    }

    //method to get phone by id
    getPhoneById(id){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "getPhoneById/" + id);
    }

    //method to update phone
    updatePhone(phone){
        return axios.put(BACKEND_BASE_URL + PHONE_URL + "updatePhone", phone);
    }

    //delete phones
   deletePhoneById(id){
        return axios.delete(BACKEND_BASE_URL + PHONE_URL + "deletePhone/"+id);
   }

   //check phone name availability
   isPhoneAvailable(phone){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "isPhoneAvailable/" + phone);
   }

   //update the phone main image URL
    updateImage(updateRequest){
        return axios.put(BACKEND_BASE_URL + PHONE_URL + "updateImage",updateRequest);
    }

}
export default new PhoneService();