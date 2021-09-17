import React, {Component} from "react";
import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:5000";
const CHIPSET_URL = "/api/phone/chipset/";

class PhoneChipsetService extends Component{
    constructor(props) {
        super(props);

    }

    //method to add chipset
    addChipset(chipset){
        return axios.post(BACKEND_BASE_URL + CHIPSET_URL + "addChipset", chipset);
    }

    //method to get all chipsets
    getAllChipsets(){

        return axios.get(BACKEND_BASE_URL + CHIPSET_URL + "getAllChipsets");

    }

    //method to get chipset by id
    getChipsetById(id){
        return axios.get(BACKEND_BASE_URL + CHIPSET_URL + "getChipsetById/" + id);
    }

    //method to delete chipset
    deleteChipset(id){
        return axios.delete(BACKEND_BASE_URL + CHIPSET_URL + "deleteChipset/" + id);
    }

    //method to update chipset
    updateChipset(newChipset){
        return axios.put(BACKEND_BASE_URL + CHIPSET_URL + "updateChipset",newChipset);
    }

    isBrandModelAvailable(brandModel){
        return axios.get(BACKEND_BASE_URL + CHIPSET_URL + "isChipsetAvailable/" + brandModel);
    }

    getChipsetByBrandModel (brandModel){
        return axios.get(BACKEND_BASE_URL + CHIPSET_URL + "getByBrandModel/" + brandModel);
    }

}

export default new PhoneChipsetService();