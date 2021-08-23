import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL_REMOTE = "";
const SERVICE_URL = "/laptop-image";
const URL = API_BASE_URL + SERVICE_URL;

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

    getLaptopImageByLaptopId(id) {
        return axios.get(URL + "/get-by-lid/" + id);
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

    deleteLaptopImageByLaptopId(id) {
        return axios.delete(URL + "/delete/" + id);
    }
}