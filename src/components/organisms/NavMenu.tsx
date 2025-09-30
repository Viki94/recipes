// 📁 src/components/organisms/NavMenu.tsx
import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavLinkItem from "../atoms/NavLinkItem";
import DropdownButton from "../atoms/DropdownButton";
import DropdownMenu from "../molecules/DropdownMenu";

const NavMenu = () => {
  const { userName, userId, token, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <ul className="flex justify-center items-center space-x-6 text-white">
        <NavLinkItem to="/" label="Home" />
        <NavLinkItem to="/recipe/create" label="Create Recipe" />
        <NavLinkItem to={`/user/${userId}/favorites`} label="Favorites" requiresAuth userId={userId} />

        <li ref={dropdownRef} className="relative">
          <DropdownButton
            onClick={() => setShowDropdown(!showDropdown)}
            isOpen={showDropdown}
            label={token ? userName : "Sign In"}
            icon={<FaUserCircle size={18} />}
          />
          <DropdownMenu
            isOpen={showDropdown}
            userId={userId}
            isAuthenticated={!!token}
            onClose={() => setShowDropdown(false)}
            onLogout={logout}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
