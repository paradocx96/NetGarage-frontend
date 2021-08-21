import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL_REMOTE = "";
const SERVICE_URL = "/laptop-brand";
const URL = API_BASE_URL + SERVICE_URL;

export default new class ServiceLaptopBrand {

    postLaptopBrand(value) {
        return axios.post(URL + "/add", value);
    }

    getLaptopBrand() {
        return axios.get(URL + "/get");
    }

    deleteLaptopBrandById(id) {
        return axios.delete(URL + "/delete/" + id);
    }

    getLaptopBrandById(id) {
        return axios.get(URL + "/get-by-id/" + id);
    }

    updateLaptopBrand(value) {
        return axios.put(URL + "/update", value);
    }
}