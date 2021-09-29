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
            if(response.data.accessToken){
                sessionStorage.setItem("user", JSON.stringify(response.data));
                console.log(JSON.stringify(response.data));
            }
            console.log(response.data);
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

    //TODO: Delete user account
    deleteAccount(id) {
        return axios.delete(API_STUDENT_BACKEND_URL + "delete-account/" + id);
    }

    //TODO: Add user feedback
    addUserFeedback(deviceID,nickName,comment){
        return axios.post(API_STUDENT_BACKEND_URL+"add-feedback",{
            deviceID,
            nickName,
            comment
        });
    }

    //TODO: Get user feedback ID
    getFeedbackByDeviceID(id) {
        return axios.get(API_STUDENT_BACKEND_URL+"get-feedback-by-deviceId/" + id);
    }
}

export default new StudentService();