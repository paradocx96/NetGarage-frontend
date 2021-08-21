import React, { Component } from "react";
import axios from "axios";

const API_STUDENT_BACKEND_URL = "http://localhost:5000/user/";

class StudentService extends Component{
    constructor(props) {
        super(props);
    }

    register(email,username,password){
        return axios.post(API_STUDENT_BACKEND_URL+"sign-up",{
            email,
            username,
            password
        });
    }
}

export default new StudentService();