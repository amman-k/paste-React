import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams(); // ✅ pulled from /pastes/:id
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id); // ✅ match paste by ID
  console.log("ID from URL:", id);
  console.log("All pastes:", allPastes);

  if (!paste) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#28443f] text-white">
        <p className="text-xl">Paste not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#28443f] text-white min-h-screen flex flex-col">
      {/* Title */}
      <div className="text-center px-4 py-4">
        <p className="text-xl font-semibold">{paste.title}</p>
      </div>

      {/* Textarea */}
      <div className="flex justify-center px-4 pb-4 flex-1">
        <textarea
          className="w-full max-w-2xl bg-[#1f2a28] text-white border rounded p-3 resize-none h-[calc(100vh-140px)] sm:h-[400px]"
          value={paste.content}
          disabled
          placeholder="Enter text here"
        />
      </div>
    </div>
  );
};

export default ViewPaste;
