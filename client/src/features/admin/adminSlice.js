import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import adminService from "./adminservice";

const initialState={
    admin:[],
    isLoading:false,
    isError:false,
    message:"",
}


export const getUsers=createAsyncThunk(
    "admin/getUsers",
    async(__,thunkAPI)=>{
        try{
            return await adminService.getUsers();

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteUser=createAsyncThunk(
    "admin/deleteUser",
    async( id,thunkAPI)=>{
        try{
            return await adminService.deleteUser(id);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const addAdmin=createAsyncThunk(
    "admin/addAdmin",
    async(adminData,thunkAPI)=>{
        try{
            return await adminService.addAdmin(adminData);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //get users error handling and loading state
        .addCase(getUsers.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.admin=action.payload;
        })
        .addCase(getUsers.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
        })

        //delete user and add admin error handling and loading state
        .addCase(deleteUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.admin=state.admin.filter(user=>user._id!==action.payload._id);
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
        })
        //add admin error handling and loading state
        .addCase(addAdmin.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addAdmin.fulfilled,(state,action)=>{
            state.admin.push(action.payload);
        })
        .addCase(addAdmin.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
        })
}});
export default adminSlice.reducer;