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
    getUserByID(){
        return axios.get(API_STUDENT_BACKEND_URL+"getUser-id/{id}")
    }
    updateUserAccount(id,email,username,password){
        return axios.post(API_STUDENT_BACKEND_URL+"update-account",{
            id,
            email,
            username,
            password
        });
    }

    //TODO: Function for Student Login
    login(username,password){
        return axios.post(API_STUDENT_BACKEND_URL+"sign-in",{
            username,
            password
        }).then(response =>{
            console.log(response.data.username);
            console.log(response.data.email);
            if(response.data.accessToken){
                sessionStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    //TODO: Get current user
    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));
    }

    //TODO: Remove current user
    logout() {
        sessionStorage.removeItem("user");
    }

    //TODO: Forgot user password
    forgotPassword(email){
        return axios.post(API_STUDENT_BACKEND_URL+"forgot-password",{
            email
        });
    }

    //TODO: Reset user password
    resetPassword(id,password) {
        return axios.post(API_STUDENT_BACKEND_URL+"reset-password",{
            id,
            password
        });
    }
}

export default new StudentService();