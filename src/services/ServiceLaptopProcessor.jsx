import axios from "axios";
import connection from "./connecction.json";
import AuthHeader from "./AuthHeader";

const SERVICE_URL = "/laptop-processor";
const URL = connection.remoteAddress + SERVICE_URL;

export default new class ServiceLaptopProcessor {

    postLaptopProcessor(value) {
        return axios.post(URL + "/add", value,{headers: AuthHeader()});
    }

    getLaptopProcessor() {
        return axios.get(URL + "/get");
    }

    deleteLaptopProcessorById(id) {
        return axios.delete(URL + "/delete/" + id,{headers: AuthHeader()});
    }

    getLaptopProcessorById(id) {
        return axios.get(URL + "/get-by-id/" + id);
    }

    updateLaptopProcessor(value) {
        return axios.put(URL + "/update", value,{headers: AuthHeader()});
    }

    checkAvailable(value) {
        return axios.get(URL + "/check/" + value, {headers: AuthHeader()});
    }
}