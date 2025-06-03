import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes) || [];
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = React.useState("");
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function formatDate(isoDate) {
    const date = new Date(isoDate);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const ordinalSuffix = (n) => {
      if (n > 3 && n < 21) return "th"; // covers 11th–13th
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
  }

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="bg-[#28443f] min-h-screen text-white">
      <div className="relative w-[90%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg group mx-auto">
  <input
    type="text"
    id="input"
    placeholder="Search here"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-white bg-[#1f2a28] border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300 placeholder-transparent"
  />
  <label
    htmlFor="input"
    className="absolute left-6 top-3.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#c4e201] peer-focus:font-semibold cursor-text"
  >
    Search Here
  </label>
</div>


      <div className="flex flex-col gap-5 m-4 p-2">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                className="border border-white rounded p-4 bg-[#1f2a28]"
                key={paste._id}
              >
                <div className="text-center text-lg font-semibold">
                  {paste.title}
                </div>
                <div className="p-2">{paste.content}</div>
                <div className="flex flex-row gap-4 justify-end mt-2">
                  <button className="bg-lime-950 text-lime-400 border border-lime-400 border-b-4 font-medium overflow-hidden relative px-3 py-1 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                    <span class="bg-lime-400 shadow-lime-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button className="bg-lime-950 text-lime-400 border border-lime-400 border-b-4 font-medium overflow-hidden relative px-3 py-1 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                    <span class="bg-lime-400 shadow-lime-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)} className="bg-lime-950 text-lime-400 border border-lime-400 border-b-4 font-medium overflow-hidden relative px-3 py-1 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                    <span class="bg-lime-400 shadow-lime-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied To Clipboard");
                    }}
                    className="bg-lime-950 text-lime-400 border border-lime-400 border-b-4 font-medium overflow-hidden relative px-3 py-1 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                  >
                    <span class="bg-lime-400 shadow-lime-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                    Copy
                  </button>
                </div>
                <div className="text-center mt-2 text-sm text-gray-300">
                  {formatDate(paste.createdAt)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
