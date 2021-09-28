import React, {Component} from "react";
import axios from "axios";
import connection from "./connecction.json";
import AuthHeader from "./AuthHeader";

const BACKEND_BASE_URL = "http://"+ connection.ipAddress +":" +connection.port;
const PHONE_URL = "/api/phone/phones/";

class PhoneService extends Component{
    constructor(props) {
        super(props);

    }
    //method to add phones
    addPhone(phone){
        return axios.post(BACKEND_BASE_URL + PHONE_URL + "addPhone",phone ,
            {headers: AuthHeader()} );
    }
    //method to get all phone entries
    getAllPhones(){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "getAllPhones",
            {headers: AuthHeader()});
    }

    //method to get phone by id
    getPhoneById(id){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "getPhoneById/" + id ,
            {headers: AuthHeader()} );
    }

    //method to update phone
    updatePhone(phone){
        return axios.put(BACKEND_BASE_URL + PHONE_URL + "updatePhone", phone ,
            {headers: AuthHeader()} );
    }

    //delete phones
   deletePhoneById(id){
        return axios.delete(BACKEND_BASE_URL + PHONE_URL + "deletePhone/"+id ,
            {headers: AuthHeader()} );
   }

   //check phone name availability
   isPhoneAvailable(phone){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "isPhoneAvailable/" + phone ,
            {headers : AuthHeader()} );
   }

   //update the phone main image URL
    updateImage(updateRequest){
        return axios.put(BACKEND_BASE_URL + PHONE_URL + "updateImage",updateRequest ,
            {headers: AuthHeader()} );
    }

    //publish a phone entry
    publishPhone(id){
        return axios.put(BACKEND_BASE_URL + PHONE_URL + "publishPhone/" + id ,
            {},{headers: AuthHeader()} );
    }

    unpublishPhone(id){
        return axios.put(BACKEND_BASE_URL + PHONE_URL + "unpublishPhone/" + id ,{},
            {headers: AuthHeader()} );
    }

    getPhonesByBrand(brand){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "getPhonesByBrand/" + brand ,
            {headers: AuthHeader()} );
    }

    getPublishedPhonesByBrand(brand){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "getPublishedPhonesByBrand/" + brand);
    }

    getPhonesByChipset(chipset){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "getPhonesByChipset/" + chipset ,
            {headers: AuthHeader()} );
    }

    getPublishedPhonesByChipset(chipset){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "getPublishedPhonesByChipset/" + chipset);
    }

    getPhonesByOS(os){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "getPhonesByOs/" +os ,
            {headers: AuthHeader()} );
    }

    getPublishedPhonesByOS(os){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "getPublishedPhonesByOs/" + os);
    }

    getPhoneByName(name){
        return axios.get(BACKEND_BASE_URL + PHONE_URL + "getPhoneByName/" + name);
    }

}
export default new PhoneService();