import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode} from 'jwt-decode';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';

interface UserData {
  name: string;
  email: string;
  role: string;
}

const UserProfile = () => {
  const { token, userName } = useAuth();
  const navigate = useNavigate();
  const { userId: urlUserId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token || !token.length) {
        navigate('/not-authorized');
        return;
      }

      try {
        const decodedToken = jwtDecode<{ id: string; role: string }>(token);

        if (decodedToken.id !== urlUserId) {
          navigate('/not-authorized');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/users/${decodedToken.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [urlUserId, token, navigate]);

  const handleEditProfile = () => {
    navigate(`/user/${urlUserId}/info`);
  };

  const handleChangePassword = () => {
    navigate(`/user/${urlUserId}/password`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      {loading && <p className="text-gray-600 font-medium text-center">Loading profile...</p>}

      {error && <p className="text-red-600 font-medium text-center">{error}</p>}

      {!loading && !error && (
        <>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Profile</h1>

          <div className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-2 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Welcome, {userName}!</h2>
            <p className="text-gray-600"><strong>Email:</strong> {userData?.email}</p>
            <p className="text-gray-600"><strong>Role:</strong> {userData?.role}</p>
          </div>

          <div className="flex flex-col space-y-3 mt-6">
            <button onClick={handleEditProfile}
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-blue-700">
              Edit Profile
            </button>
            <button onClick={handleChangePassword}
              className="w-full bg-red-600 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-red-700">
              Change Password
            </button>
          </div>

          {loading && <p className="text-gray-600 font-medium mt-4 text-center">Loading...</p>}
          {error && <p className="text-red-600 font-medium mt-4 text-center">{error}</p>}
        </>
      )}
    </div>
  );
};

export default UserProfile;
