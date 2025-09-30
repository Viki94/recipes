// import React, { useState, useEffect } from 'react';
// import axios, { AxiosError } from 'axios';
// import { useNavigate, NavLink } from 'react-router-dom';
// import { useAuth } from '../../../contexts/AuthContext';

// import './UserRegister.scss';


// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     firstName: '',
//     lastName: ''
//   });

//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const { login, token } = useAuth();

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

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setSuccessMessage('');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/users/register', formData);
//       if (response.status === 201) {
//         setSuccessMessage('Registration successful. Logging you in...');
//         setError('');

//         const loginResponse = await axios.post('http://localhost:5000/api/users/login', {
//           email: formData.email,
//           password: formData.password
//         });

//         if (loginResponse.status === 200) {
//           const { token } = loginResponse.data;
//           login(token);
//           navigate('/');
//         }
//       }
//     } catch (err) {
//       if (err instanceof AxiosError) {
//         setError(err.response?.data.message || 'An error occurred.');
//         setSuccessMessage('');
//       } else {
//         setError('An error occurred. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium">Username:</label>
//           <input type="text" name="username" value={formData.username} onChange={handleInputChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" required />
//         </div>

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

//         <div>
//           <label className="block text-gray-700 font-medium">Confirm Password:</label>
//           <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" required />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">First Name:</label>
//           <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Last Name:</label>
//           <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-blue-700">
//           Register
//         </button>

//         <p className="text-center text-gray-600 text-sm mt-4">
//           Already have an account? <NavLink to="/user/login" className="text-blue-500 font-bold hover:underline">
//             Login here
//           </NavLink>
//         </p>
//       </form>

//       {error && <p className="text-red-600 font-medium mt-4 text-center">{error}</p>}
//       {successMessage && <p className="text-green-600 font-medium mt-4 text-center">{successMessage}</p>}
//     </div>
//   );
// };

// export default Register;
