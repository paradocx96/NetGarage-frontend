import axios from "axios";
import connection from "./connecction.json";
import AuthHeader from "./AuthHeader";

const SERVICE_URL = "/laptop-graphic";
const URL = connection.remoteAddress + SERVICE_URL;

export default new class ServiceLaptopGraphic {

    postLaptopGraphic(value) {
        return axios.post(URL + "/add", value,{headers: AuthHeader()});
    }

    getLaptopGraphic() {
        return axios.get(URL + "/get");
    }

    deleteLaptopGraphicById(id) {
        return axios.delete(URL + "/delete/" + id,{headers: AuthHeader()});
    }

    getLaptopGraphicById(id) {
        return axios.get(URL + "/get-by-id/" + id);
    }

    updateLaptopGraphic(value) {
        return axios.put(URL + "/update", value,{headers: AuthHeader()});
    }
}