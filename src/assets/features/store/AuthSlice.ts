import {type PayloadAction ,createSlice } from "@reduxjs/toolkit";
import {type User } from "firebase/auth";
type AuthState={
    user:Pick<User,"displayName"| "email"|"photoURL">|null;
}
const initialState:AuthState ={
    user:null
}
const AuthSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        authenticated(state,action:PayloadAction<Pick<User,"displayName"| "email"|"photoURL">>){
            state.user= action.payload
        },
        unauthenticated(state){
            state.user=null
        }
    }

})
export default AuthSlice;
export  const AuthReducer= AuthSlice.reducer
export const AuthAction = AuthSlice.actions;
export const AuthSelector = AuthSlice.selectSlice;