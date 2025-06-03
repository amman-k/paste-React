import React from "react";
import { NavLink } from "react-router";

const navbar = () => {
  return (
    <div className="bg-[#28443f] min-w-full">
      <div className="flex items-center justify-center flex-row gap-4 p-5 text-white ">
        <NavLink
          to="/"
          className="hover:text-[#cfef00] transition-colors duration-200"
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className="hover:text-[#cfef00] transition-colors duration-200"
        >
          Pastes
        </NavLink>
      </div>
    </div>
  );
};

export default navbar;
