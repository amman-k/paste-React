import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    if (!title) {
      toast.error("Title cannot be empty");
      return;
    } else if (!value) {
      toast.error("Value cannot be empty");
      return;
    }
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="flex items-center flex-col bg-[#28443f] text-white min-h-screen px-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full max-w-2xl">
        <input
          className="rounded-xl border pl-2 py-2 text-white flex-1 bg-[#1f2a28]"
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button className="button1" onClick={createPaste}>
          {pasteId ? "Update" : "Create"}
        </button>
      </div>

      <textarea
        className="border p-3 text-white rounded-md w-full max-w-2xl h-[300px] sm:h-[400px] resize-y bg-[#1f2a28] "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text here"
      />
    </div>
  );
};

export default home;
