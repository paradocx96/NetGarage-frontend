import axios from "axios";
import connection from "./connecction.json";
import AuthHeader from "./AuthHeader";

const SERVICE_URL = "/laptop-brand";
const URL = connection.remoteAddress + SERVICE_URL;

export default new class ServiceLaptopBrand {

    postLaptopBrand(value) {
        return axios.post(URL + "/add", value, {headers: AuthHeader()});
    }

    getLaptopBrand() {
        return axios.get(URL + "/get");
    }

    deleteLaptopBrandById(id) {
        return axios.delete(URL + "/delete/" + id, {headers: AuthHeader()});
    }

    getLaptopBrandById(id) {
        return axios.get(URL + "/get-by-id/" + id);
    }

    updateLaptopBrand(value) {
        return axios.put(URL + "/update", value, {headers: AuthHeader()});
    }

    checkAvailable(value) {
        return axios.get(URL + "/check/" + value, {headers: AuthHeader()});
    }
}