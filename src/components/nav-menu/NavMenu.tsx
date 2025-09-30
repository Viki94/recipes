// import React, { useState, useEffect, useRef } from 'react';
// import { NavLink, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../../contexts/AuthContext';
// import { FaUserEdit, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
// import { BsPersonFillSlash } from 'react-icons/bs';
// import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
// import { RiLockPasswordFill, RiUserShared2Fill, RiUserAddFill } from "react-icons/ri";

// const NavMenu = () => {
//   const { userName, userId, token, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showAuthOptions, setShowAuthOptions] = useState(false);
//   const [showProfileOptions, setShowProfileOptions] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const dropdownRef = useRef<HTMLLIElement>(null);

//   const handleLogout = () => {
//     logout();
//     setShowProfileOptions(false);
//     navigate('/');
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowAuthOptions(false);
//         setShowProfileOptions(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setShowAuthOptions(false);
//     setShowProfileOptions(false);
//   }, [token]);

//   return (
//     <nav className="bg-gray-800 p-4 shadow-md">
//       <div className="md:hidden flex justify-between items-center">
//         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white text-2xl cursor-pointer">
//           {mobileMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       <ul className={`md:flex justify-center items-center space-x-6 text-white
//         ${mobileMenuOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}>
//         <li className="mr-0 md:mr-6 mt-4 md:mt-0">
//           <NavLink to="/" className={({ isActive }) =>
//             `px-4 py-2 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-500'}`}>
//             Home
//           </NavLink>
//         </li>
//         <li className="mr-0 md:mr-6 mt-4 md:mt-0">
//           <NavLink to="/recipe/create" className={({ isActive }) =>
//             `px-4 py-2 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-500'}`}>
//             Create Recipe
//           </NavLink>
//         </li>
//         <li className="mr-0 md:mr-6 mt-4 md:mt-0">
//           <NavLink
//             to={`/user/${userId}/favorites`}
//             onClick={(e) => {
//               if (!userId) {
//                 e.preventDefault();
//                 navigate('/user/login');
//               }
//             }}
//             className={({ isActive }) =>
//               `px-4 py-2 rounded-lg transition ${isActive ? 'bg-blue-600' : 'hover:bg-blue-500'}`
//             }
//           >
//             Favorite Recipes
//           </NavLink>
//         </li>
//         <li ref={dropdownRef} className="relative mr-0 md:mr-6 mt-4 md:mt-0">
//           <button className="flex items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition cursor-pointer"
//             onClick={() => !token ? setShowAuthOptions(!showAuthOptions) : setShowProfileOptions(!showProfileOptions)}>
//             <FaUserCircle size={18} className="mr-2" /> {token ? userName : "Sign In"}
//             {token ? (showProfileOptions ? <IoMdArrowDropup size={14} className="ml-2" /> : <IoMdArrowDropdown size={14} className="ml-2" />)
//                   : (showAuthOptions ? <IoMdArrowDropup size={14} className="ml-2" /> : <IoMdArrowDropdown size={14} className="ml-2" />)}
//           </button>

//           {!token && showAuthOptions && (
//             <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-5">
//               <NavLink
//                 to="/user/login"
//                 className={`block px-4 py-2 text-gray-700 cursor-pointer ${location.pathname === "/user/login" ? "bg-blue-600 text-white" : "hover:text-white hover:bg-blue-500"}`}
//                 onClick={() => setShowAuthOptions(false)}
//               >
//                 <RiUserShared2Fill size={18} className="inline mr-2" /> Login
//               </NavLink>
//               <NavLink
//                 to="/user/register"
//                 className={`block px-4 py-2 text-gray-700 cursor-pointer ${location.pathname === "/user/register" ? "bg-blue-600 text-white" : "hover:text-white hover:bg-blue-500"}`}
//                 onClick={() => setShowAuthOptions(false)}
//               >
//                 <RiUserAddFill size={18} className="inline mr-2" /> Register
//               </NavLink>
//             </div>
//           )}

//           {token && showProfileOptions && (
//             <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-5">
//               <NavLink
//                 to={`/user/${userId}/info`}
//                 className={`block px-4 py-2 text-gray-700 cursor-pointer ${location.pathname === `/user/${userId}/info` ? "bg-blue-600 text-white" : "hover:text-white hover:bg-blue-500"}`}
//                 onClick={() => setShowProfileOptions(false)}
//               >
//                 <FaUserEdit size={18} className="inline mr-2" /> Edit Profile
//               </NavLink>
//               <NavLink
//                 to={`/user/${userId}/password`}
//                 className={`block px-4 py-2 text-gray-700 cursor-pointer ${location.pathname === `/user/${userId}/password` ? "bg-blue-600 text-white" : "hover:text-white hover:bg-blue-500"}`}
//                 onClick={() => setShowProfileOptions(false)}
//               >
//                 <RiLockPasswordFill size={18} className="inline mr-2" /> Change Password
//               </NavLink>
//               <button onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-500 cursor-pointer w-full text-left">
//                 <BsPersonFillSlash size={18} className="inline mr-2" /> Logout
//               </button>
//             </div>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavMenu;
