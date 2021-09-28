import axios from "axios";
import connection from "./connecction.json";

const SERVICE_URL = "/laptop-image";
const URL = connection.remoteAddress + SERVICE_URL;

export default new class ServiceLaptopImage {

    // TODO: POST IMAGE
    //  {
    //     "lid" : "",
    //     "link" : ["",""],
    //     "user" : ""
    //  }
    postLaptopImage(value) {
        return axios.post(URL + "/add", value);
    }

    getLaptopImage() {
        return axios.get(URL + "/get");
    }

    getLaptopImageById(id) {
        return axios.get(URL + "/get-by-id/" + id);
    }

    getLaptopImageByLaptopId(lid) {
        return axios.get(URL + "/get-by-lid/" + lid);
    }

    // TODO: PUT IMAGE
    //  {
    //     "lid" : "",
    //     "link" : ["",""],
    //     "user" : ""
    //  }
    updateLaptopImageByLaptopId(value) {
        return axios.put(URL + "/update", value);
    }

    // TODO: PUT IMAGE
    //  {
    //     "lid" : "",
    //     "mainlink" : ["",""],
    //     "user" : ""
    //  }
    updateLaptopMainImageByLaptopId(value) {
        return axios.put(URL + "/update-main", value);
    }

    deleteLaptopImageByLaptopId(id) {
        return axios.delete(URL + "/delete/" + id);
    }
}