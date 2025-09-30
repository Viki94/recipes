// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import { useAuth } from '../../../contexts/AuthContext';

// const UserPassword = () => {
//   const { userId: urlUserId } = useParams<{ userId: string }>(); // Extract userId from the URL
//   const [passwordData, setPasswordData] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmNewPassword: ''
//   });
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();
//   const { token } = useAuth();

//   useEffect(() => {
//     if (!token || !token.length) {
//       navigate('/not-authorized');
//       return;
//     }

//     try {
//       const decodedToken = jwtDecode<{ id: string; role: string }>(token);

//       if (decodedToken.id !== urlUserId) {
//         navigate('/not-authorized');
//         return;
//       }
//     } catch (error) {
//       console.error('Token decoding error:', error);
//       navigate('/not-authorized');
//     }
//   }, [token, urlUserId, navigate]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPasswordData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!token || !token.length) {
//       navigate('/not-authorized');
//       return;
//     }

//     const { oldPassword, newPassword, confirmNewPassword } = passwordData;

//     if (!oldPassword || !newPassword || !confirmNewPassword) {
//       setError('Please fill in all password fields.');
//       setSuccessMessage('');
//       return;
//     }

//     if (newPassword !== confirmNewPassword) {
//       setError('New passwords do not match.');
//       setSuccessMessage('');
//       return;
//     }

//     if (oldPassword === newPassword) {
//       setError('New password must be different from the old password.');
//       setSuccessMessage('');
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/users/${urlUserId}`,
//         {
//           oldPassword,
//           newPassword
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       if (response.status === 200) {
//         setPasswordData({
//           oldPassword: '',
//           newPassword: '',
//           confirmNewPassword: ''
//         });
//         setSuccessMessage('Password updated successfully!');
//         setError('');

//         setTimeout(() => {
//           navigate(`/user/${urlUserId}/profile`);
//         }, 1000);
//       }
//     } catch (error) {
//       console.error(error);
//       setError('Old password is incorrect or password update failed.');
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Change Password</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium">Old Password:</label>
//           <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handleInputChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" required />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">New Password:</label>
//           <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handleInputChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" required />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Confirm New Password:</label>
//           <input type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handleInputChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" required />
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-blue-700">
//           Change Password
//         </button>
//       </form>

//       {successMessage && <p className="text-green-600 font-medium mt-4 text-center">{successMessage}</p>}
//       {error && <p className="text-red-600 font-medium mt-4 text-center">{error}</p>}
//     </div>
//   );
// };

// export default UserPassword;
