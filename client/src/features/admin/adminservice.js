import axios from "axios";

const API_URL= "http://localhost:5000/api/admin/";


//get all users
const getUsers = async()=>{
    const response=await axios.get(API_URL+"users");
    return response.data;
}

//delete user
const deleteUser=async(id)=>{
    const response=await axios.delete(API_URL+`users/${id}`);
    return response.data;
}

//add more admin related services here
const addAdmin=async(adminData)=>{
    const response=await axios.post(API_URL+"addAdmin",adminData);
    return response.data;
}

export default {
    getUsers,
    deleteUser,
    addAdmin
};