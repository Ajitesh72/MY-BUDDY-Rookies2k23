import {createSlice} from "@reduxjs/toolkit";

export const navbarSlice=createSlice({
    name:"nav",
    initialState:{value:false},
    reducers:{
        flipNavbar:(state,action)=>{
            //Write code for fliiping the state
            state.value=!action.payload.flip;
        },
      
    },
});

export const {flipNavbar} =navbarSlice.actions;
export default navbarSlice.reducer;