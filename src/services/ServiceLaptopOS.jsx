import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL_REMOTE = "";
const SERVICE_URL = "/laptop-os";
const URL = API_BASE_URL + SERVICE_URL;

export default new class ServiceLaptopOS {

    postLaptopOS(value) {
        return axios.post(URL + "/add", value);
    }

    getLaptopOS() {
        return axios.get(URL + "/get");
    }

    deleteLaptopOSById(id) {
        return axios.delete(URL + "/delete/" + id);
    }

    getLaptopOSById(id) {
        return axios.get(URL + "/get-by-id/" + id);
    }

    updateLaptopOS(value) {
        return axios.put(URL + "/update", value);
    }
}