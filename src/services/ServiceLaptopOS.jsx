import axios from "axios";
import connection from "./connecction.json";
import AuthHeader from "./AuthHeader";

const SERVICE_URL = "/laptop-os";
const URL = connection.remoteAddress + SERVICE_URL;

export default new class ServiceLaptopOS {

    postLaptopOS(value) {
        return axios.post(URL + "/add", value,{headers: AuthHeader()});
    }

    getLaptopOS() {
        return axios.get(URL + "/get");
    }

    deleteLaptopOSById(id) {
        return axios.delete(URL + "/delete/" + id,{headers: AuthHeader()});
    }

    getLaptopOSById(id) {
        return axios.get(URL + "/get-by-id/" + id);
    }

    updateLaptopOS(value) {
        return axios.put(URL + "/update", value,{headers: AuthHeader()});
    }
}