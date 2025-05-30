import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const home = () => {
  const [title, setTitle] = useState("");
  const [value,setValue]=useState("");
  const [searchParams,setSearchParams]=useSearchParams();
  const pasteId=searchParams.get("pasteId");
  const dispatch=useDispatch();
  const allPastes=useSelector((state)=>state.paste.pastes);

   useEffect(() => {
        if(pasteId){
            const paste=allPastes.find((p)=>p._id===pasteId);
            setTitle(paste.title);
            setValue(paste.content); 
        }

    }, [pasteId])

  function createPaste(){

    if(!title)
    {
        toast.error("Title cannot be empty");
        return;
    }
    else if(!value)
    {
        toast.error("Value cannot be empty");
        return;
    }
    const paste={
        title:title,
        content:value,
        _id:pasteId||Date.now().toString(36),
        createdAt: new Date().toISOString(),
    }
   
    

    if(pasteId){
        dispatch(updateToPastes(paste));
    }
    else{
        dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue('');
    setSearchParams({});
  }

  return (
    <>
    <div className="flex flex-row gap-4 m-auto">
      <input
        className="rounded-xl border pl-2 mt-2"
        type="text"
        placeholder="Enter Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
        <button className="button1" onClick={createPaste}>{pasteId?"Update":"Create"}</button>
    </div>
    <div>
        <textarea className="border mt-4 p-2 min-w-[500px] m-auto" value={value} onChange={(e)=>{setValue(e.target.value)}} placeholder="Enter text here" rows={20}></textarea>
    </div>
    </>
  );
};

export default home;
