// import React, { useState, useEffect } from 'react';
// import { useNavigate, NavLink } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../../../contexts/AuthContext';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const { login, token } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       navigate('/');
//     }
//   }, [token, navigate]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/users/login', formData);
//       if (response.status === 200) {
//         login(response.data.token);
//         navigate('/');
//       }
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium">Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleInputChange} 
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" required />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Password:</label>
//           <input type="password" name="password" value={formData.password} onChange={handleInputChange} 
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" required />
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-blue-700">
//           Login
//         </button>

//         <p className="text-center text-gray-600 text-sm mt-4">
//           Don't have an account? <NavLink to="/user/register" className="text-blue-500 font-bold hover:underline">
//             Sign up here
//           </NavLink>
//         </p>
//       </form>

//       {error && <p className="text-red-600 font-medium mt-4 text-center">{error}</p>}
//     </div>
//   );
// };

// export default Login;
