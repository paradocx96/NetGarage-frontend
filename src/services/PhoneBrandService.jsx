import React, {Component} from "react";
import axios from "axios";
import connection from "./connecction.json";
import AuthHeader from "./AuthHeader";

const BACKEND_BASE_URL = "http://"+ connection.ipAddress +":" +connection.port;
const BRAND_URL = "/api/phone/brand/";

class PhoneBrandService extends Component{

    constructor(props) {
        super(props);

    }

    //add a new brand
    addBrand(brand){
        return axios.post(BACKEND_BASE_URL + BRAND_URL + "addBrand",brand,
            {headers: AuthHeader()});
    }

    //returns all the brands
    getAllBrandds(){
        return axios.get(BACKEND_BASE_URL+BRAND_URL + "getAllBrands");
    }

    //returns brand on given id
    getBrandById(id){
        return axios.get(BACKEND_BASE_URL + BRAND_URL + "getBrandById/" + id ,
            {headers: AuthHeader()});
    }

    //return brand on given name
    getBrandByName(name){
        return axios.get(BACKEND_BASE_URL + BRAND_URL + "getBrandByName/" +name,
            {headers: AuthHeader()} );
    }

    //update a brand
    updateBrand(brand){
        return axios.put(BACKEND_BASE_URL + BRAND_URL + "updateBrand", brand ,
            {headers: AuthHeader()} );
    }

    //delete a brand
    deleteBrand(id){
        return axios.delete(BACKEND_BASE_URL + BRAND_URL + "deleteBrandById/"+ id ,
            {headers: AuthHeader()} );
    }

    isBrandAvailable(brand){
        return axios.get(BACKEND_BASE_URL + BRAND_URL + "isBrandAvailable/" + brand ,
            {headers : AuthHeader()} );
    }

}
export default new PhoneBrandService();