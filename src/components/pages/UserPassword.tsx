import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../../contexts/AuthContext";
import Heading from "../atoms/Heading";
import Message from "../atoms/Message";
import FormField from "../molecules/FormField";
import SubmitButton from "../atoms/SubmitButton";

const UserPassword = () => {
  const { userId: urlUserId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/not-authorized");
      return;
    }

    try {
      const decodedToken = jwtDecode<{ id: string }>(token);
      if (decodedToken.id !== urlUserId) {
        navigate("/not-authorized");
      }
    } catch (error) {
      console.error("Token decoding error:", error);
      navigate("/not-authorized");
    }
  }, [token, urlUserId, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let validationErrors: string[] = [];

    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
      validationErrors.push("All fields are required.");
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      validationErrors.push("New passwords do not match.");
    }

    if (passwordData.oldPassword === passwordData.newPassword) {
      validationErrors.push("New password must be different from the old password.");
    }

    if (validationErrors.length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${urlUserId}`,
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setSuccessMessage("Password updated successfully!");
        setErrorMessage([]);

        setTimeout(() => {
          setSuccessMessage("");
          navigate(`/user/${urlUserId}/profile`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage(["Old password is incorrect or password update failed."]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <Heading title="Change Password" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Old Password"
          type="password"
          name="oldPassword"
          value={passwordData.oldPassword}
          placeholder="Enter old password"
          onChange={handleInputChange}
        />

        <FormField
          label="New Password"
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          placeholder="Enter new password"
          onChange={handleInputChange}
        />

        <FormField
          label="Confirm New Password"
          type="password"
          name="confirmNewPassword"
          value={passwordData.confirmNewPassword}
          placeholder="Confirm new password"
          onChange={handleInputChange}
        />

        <SubmitButton type="submit" text="Change Password" />
      </form>

      {errorMessage.length > 0 && <Message message={errorMessage} type="error" />}
      {successMessage && <Message message={successMessage} type="success" />}
    </div>
  );
};

export default UserPassword;
