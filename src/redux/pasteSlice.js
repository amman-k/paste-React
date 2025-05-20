import js from '@eslint/js';
import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    paste:localStorage.getItem("pastes")?JSON.parse(localStorage.getItem("pastes")):[], 
  },
  reducers: {
    addToPastes: (state,action) => {
        const paste=action.payload;
        state.paste.push(paste);
        localStorage.setItem("pastes",JSON.stringify(state.paste))
        toast.success("Paste Created");
    },
    updateToPastes: (state,action) => {
        const paste=action.payload;
        const index=state.paste.findIndex((item)=>item._id===paste._id);

        if(index>=0){
            state.paste[index]=paste;
            localStorage.setItem("pastes",JSON.stringify(state.paste));
            toast.success("Paste Updated");
        }
    },
    resetAllPastes: (state, action) => {
        state.paste=[];
        localStorage.removeItem("pastes");
    },
    removeFromPastes:(state,action)=> {
        const pasteId=action.payload;
        const index=state.paste.findIndex((item)=>item._id===pasteId);
        if(index>0)
        {
            state.paste.splice(index,1);
            localStorage.setItem("pastes",JSON.stringify(state.paste));
            toast.success("Paste Deleted");
        }
    },
  }
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer   