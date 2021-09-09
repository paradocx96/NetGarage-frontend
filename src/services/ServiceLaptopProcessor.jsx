import axios from "axios";

// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL_REMOTE = "https://netgarage-api.herokuapp.com";
const SERVICE_URL = "/laptop-processor";
const URL = API_BASE_URL_REMOTE + SERVICE_URL;

export default new class ServiceLaptopProcessor {

    postLaptopProcessor(value) {
        return axios.post(URL + "/add", value);
    }

    getLaptopProcessor() {
        return axios.get(URL + "/get");
    }

    deleteLaptopProcessorById(id) {
        return axios.delete(URL + "/delete/" + id);
    }

    getLaptopProcessorById(id) {
        return axios.get(URL + "/get-by-id/" + id);
    }

    updateLaptopProcessor(value) {
        return axios.put(URL + "/update", value);
    }
}