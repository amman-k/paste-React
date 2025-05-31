import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const ViewPaste = () => {

    const {id}=useSearchParams();
    const allPastes=useSelector((state)=> state.paste.pastes);
    const paste=allPastes.filter((p)=>p.id===id)[0]; 

  return (
    <>
      <div className="flex flex-row gap-4 m-auto">
        <input
          className="rounded-xl border pl-2 mt-2"
          type="text"
          disabled
          placeholder="Enter Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={paste.title}
        />
      </div>
      <div>
        <textarea
          className="border mt-4 p-2 min-w-[500px] m-auto"
          value={paste.content}
          disabled
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="Enter text here"
          rows={20}
        ></textarea>
      </div>
    </>
  );
};

export default ViewPaste;
