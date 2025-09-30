import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Heading from "../atoms/Heading";
import AuthForm from "../molecules/AuthForm";
import Message from "../atoms/Message";

const Register = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      if (response.status === 201) {
        setSuccessMessage("Registration successful. Logging you in...");
        setErrorMessage("");

        const loginResponse = await axios.post("http://localhost:5000/api/users/login", {
          email: formData.email,
          password: formData.password,
        });

        if (loginResponse.status === 200) {
          login(loginResponse.data.token);
          navigate("/");
        }
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data.message || "An error occurred.");
        setSuccessMessage("");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <Heading title="Register" />
      <AuthForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        buttonText="Register"
        errorMessage={errorMessage}
        successMessage={successMessage}
        isRegister={true}
      />
    </div>
  );
};

export default Register;
