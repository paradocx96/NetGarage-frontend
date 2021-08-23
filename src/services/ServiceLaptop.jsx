import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL_REMOTE = "";
const SERVICE_URL = "/laptop";
const URL = API_BASE_URL + SERVICE_URL;

export default new class ServiceLaptop {

    postLaptop(value) {
        return axios.post(URL + "/add", value);
    }

    getLaptop() {
        return axios.get(URL + "/get");
    }

    getLaptopByStatus(status) {
        return axios.get(URL + "/get-by-status/" + status);
    }

    updateLaptopStatus(value) {
        return axios.put(URL + "/update-status/", value);
    }

    deleteLaptopById(id) {
        return axios.delete(URL + "/delete/" + id);
    }

    getLaptopById(id) {
        return axios.get(URL + "/get-by-id/" + id);
    }

    getLaptopObjectById(id) {
        return axios.get(URL + "/get-object-by-id/" + id);
    }

    updateLaptop(value) {
        return axios.put(URL + "/update/", value);
    }
}