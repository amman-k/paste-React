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
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const ordinalSuffix = (n) => {
    if (n > 3 && n < 21) return 'th'; // covers 11th–13th
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${ordinalSuffix(day)} ${month} ${year}`;
}

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className="mt-5"
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className="flex flex-col gap-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border" key={paste._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button ><a href={`/?pasteId=${paste?._id}`}>
                    Edit</a></button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>
                    View</a></button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copiied To Clipboard");
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div>{formatDate(paste.createdAt)}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
