import axios from "axios";
import connection from "./connecction.json";
import AuthHeader from "./AuthHeader";

const SERVICE_URL = "/laptop";
const URL = connection.remoteAddress + SERVICE_URL;

export default new class ServiceLaptop {

    postLaptop(value) {
        return axios.post(URL + "/add", value,{headers: AuthHeader()});
    }

    getLaptop() {
        return axios.get(URL + "/get",{headers: AuthHeader()});
    }

    getLaptopByStatus(status) {
        return axios.get(URL + "/get-by-status/" + status);
    }

    updateLaptopStatus(value) {
        return axios.put(URL + "/update-status/", value,{headers: AuthHeader()});
    }

    deleteLaptopById(id) {
        return axios.delete(URL + "/delete/" + id,{headers: AuthHeader()});
    }

    getLaptopById(id) {
        return axios.get(URL + "/get-by-id/" + id);
    }

    getLaptopObjectById(id) {
        return axios.get(URL + "/get-object-by-id/" + id);
    }

    updateLaptop(value) {
        return axios.put(URL + "/update/", value,{headers: AuthHeader()});
    }

    updateLaptopImage(value) {
        return axios.put(URL + "/update-image/", value,{headers: AuthHeader()});
    }

    deleteLaptopSelected(value) {
        return axios.delete(URL + "/delete-selected/", value);
    }

    getLaptopByBrand(brand) {
        return axios.get(URL + "/get-by-brand/" + brand);
    }

    getLaptopByRamCapacity(ram) {
        return axios.get(URL + "/get-by-ram/" + ram);
    }

    getLaptopByProcessorName(processor) {
        return axios.get(URL + "/get-by-processor/" + processor);
    }

    generateReportAllLaptops() {
        return axios.get(URL + "/report-all/",{headers: AuthHeader()});
    }
}