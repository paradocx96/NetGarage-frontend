import React, {Component} from "react";
import axios from "axios";
import connection from "./connecction.json";

const BACKEND_BASE_URL = "http://"+ connection.ipAddress +":" +connection.port;
const BRAND_URL = "/api/phone/brand/";

class PhoneBrandService extends Component{

    constructor(props) {
        super(props);

    }

    //add a new brand
    addBrand(brand){
        return axios.post(BACKEND_BASE_URL + BRAND_URL + "addBrand",brand);
    }

    //returns all the brands
    getAllBrandds(){
        return axios.get(BACKEND_BASE_URL+BRAND_URL + "getAllBrands");
    }

    //returns brand on given id
    getBrandById(id){
        return axios.get(BACKEND_BASE_URL + BRAND_URL + "getBrandById/" + id);
    }

    //return brand on given name
    getBrandByName(name){
        return axios.get(BACKEND_BASE_URL + BRAND_URL + "getBrandByName/" +name);
    }

    //update a brand
    updateBrand(brand){
        return axios.put(BACKEND_BASE_URL + BRAND_URL + "updateBrand", brand);
    }

    //delete a brand
    deleteBrand(id){
        return axios.delete(BACKEND_BASE_URL + BRAND_URL + "deleteBrandById/"+ id);
    }

}
export default new PhoneBrandService();