import axios from "axios";
import connection from "./connecction.json";

const SERVICE_URL = "/laptop";
const URL = connection.remoteAddress + SERVICE_URL;

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

    updateLaptopImage(value) {
        return axios.put(URL + "/update-image/", value);
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
        return axios.get(URL + "/report-all/");
    }
}