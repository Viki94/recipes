// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../contexts/AuthContext';
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   firstName: string;
//   lastName: string;
// }

// const UserInfo = () => {
//   const [userData, setUserData] = useState<User | null>(null);
//   const [formData, setFormData] = useState<User | null>(null);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const { userId, token } = useAuth();
//   const navigate = useNavigate();
//   const { userId: urlUserId } = useParams<{ userId: string }>();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       console.log(token);
//       if (!token.length) {
//         navigate('/not-authorized');
//         return;
//       }

//       const decodedToken = jwtDecode<{ id: string; role: string }>(token);
//       console.log('User ID:', decodedToken.id);
//       console.log('User Role:', decodedToken.role);

//       if (decodedToken.id !== urlUserId) {
//         navigate('/not-authorized');
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/api/users/${decodedToken.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUserData(response.data);
//         setFormData(response.data);
//       } catch (error) {
//         setError('Failed to load user profile');
//       }
//     };

//     fetchUserProfile();
//   }, [userId]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => prev ? { ...prev, [name]: value } : null);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData) return;

//     try {
//       await axios.put(`http://localhost:5000/api/users/${userId}`, formData , {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSuccessMessage('Profile updated successfully!');
//       setError('');
//       setTimeout(() => {
//         navigate(`/user/${userId}/profile`);
//       }, 1000);
//     } catch (error) {
//       setError('Failed to update profile');
//       setSuccessMessage('');
//       setTimeout(() => setError(''), 1000);
//     }
//   };

//   if (!userData) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Personal Information</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium">Email:</label>
//           <input type="email" name="email" value={formData?.email || ''} onChange={handleInputChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" required />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">First Name:</label>
//           <input type="text" name="firstName" value={formData?.firstName || ''} onChange={handleInputChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Last Name:</label>
//           <input type="text" name="lastName" value={formData?.lastName || ''} onChange={handleInputChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-blue-700">
//           Save Changes
//         </button>
//       </form>

//       {successMessage && <p className="text-green-600 font-medium mt-4 text-center">{successMessage}</p>}
//       {error && <p className="text-red-600 font-medium mt-4 text-center">{error}</p>}
//     </div>
//   );
// };

// export default UserInfo;
