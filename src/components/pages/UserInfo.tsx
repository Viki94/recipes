import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import FormField from "../molecules/FormField";
import Heading from "../atoms/Heading";
import Loading from "../atoms/Loading";
import Message from "../atoms/Message";
import SubmitButton from "../atoms/SubmitButton";

interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

const UserInfo = () => {
  const { token, userId } = useAuth();
  const navigate = useNavigate();
  const { userId: urlUserId } = useParams<{ userId: string }>();

  const [formData, setFormData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/not-authorized");
      return;
    }

    if (!userId) {
      setLoading(true);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const decodedToken = jwtDecode<{ id: string; role: string }>(token);

        if (decodedToken.id !== urlUserId) {
          navigate("/not-authorized");
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/users/${decodedToken.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setErrorMessage("Failed to load user profile. Please try again.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, token, urlUserId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setSuccessMessage("Profile updated successfully!");
        setErrorMessage(null);

        setTimeout(() => {
          setSuccessMessage(null);
          navigate(`/user/${userId}/profile`);
        }, 1000);
      }
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <Heading title="Edit Personal Information" />

      {loading ? (
        <Loading text="Loading user info..." />
      ) : errorMessage ? (
        <Message message={errorMessage} type="error" />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Email"
            type="email"
            name="email"
            value={formData?.email || ""}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          <FormField
            label="First Name"
            type="text"
            name="firstName"
            value={formData?.firstName || ""}
            onChange={handleInputChange}
            placeholder="Enter your first name"
          />
          <FormField
            label="Last Name"
            type="text"
            name="lastName"
            value={formData?.lastName || ""}
            onChange={handleInputChange}
            placeholder="Enter your last name"
          />

          <SubmitButton type="submit" text="Save Changes" />
        </form>
      )}

      {successMessage && <Message message={successMessage} type="success" />}
    </div>
  );
};

export default UserInfo;
