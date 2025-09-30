import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavLinkItemProps {
  to: string;
  label: string;
  requiresAuth?: boolean;
  userId?: string;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ to, label, requiresAuth = false, userId }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (requiresAuth && !userId) {
      e.preventDefault();
      navigate("/user/login");
    }
  };

  return (
    <li>
      <NavLink
        to={to}
        onClick={handleClick}
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-500"}`
        }
      >
        {label}
      </NavLink>
    </li>
  );
};

export default NavLinkItem;
