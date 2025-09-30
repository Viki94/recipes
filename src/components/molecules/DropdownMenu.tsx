import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { RiLockPasswordFill, RiUserShared2Fill, RiUserAddFill } from "react-icons/ri";
import { BsPersonFillSlash } from "react-icons/bs";

interface DropdownMenuProps {
  isOpen: boolean;
  userId?: string;
  isAuthenticated: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, userId, isAuthenticated, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
      {isAuthenticated ? (
        <>
          <NavLink to={`/user/${userId}/info`} className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={onClose}>
            <FaUserEdit size={18} className="inline mr-2" /> Edit Profile
          </NavLink>
          <NavLink to={`/user/${userId}/password`} className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={onClose}>
            <RiLockPasswordFill size={18} className="inline mr-2" /> Change Password
          </NavLink>
          <button onClick={onLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left cursor-pointer">
            <BsPersonFillSlash size={18} className="inline mr-2" /> Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/user/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={onClose}>
            <RiUserShared2Fill size={18} className="inline mr-2" /> Login
          </NavLink>
          <NavLink to="/user/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={onClose}>
            <RiUserAddFill size={18} className="inline mr-2" /> Register
          </NavLink>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;
