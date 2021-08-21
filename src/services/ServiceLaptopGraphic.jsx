import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL_REMOTE = "";
const SERVICE_URL = "/laptop-graphic";
const URL = API_BASE_URL + SERVICE_URL;

export default new class ServiceLaptopGraphic {

    postLaptopGraphic(value) {
        return axios.post(URL + "/add", value);
    }

    getLaptopGraphic() {
        return axios.get(URL + "/get");
    }

    deleteLaptopGraphicById(id) {
        return axios.delete(URL + "/delete/" + id);
    }

    getLaptopGraphicById(id) {
        return axios.get(URL + "/get-by-id/" + id);
    }

    updateLaptopGraphic(value) {
        return axios.put(URL + "/update", value);
    }
}