import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Heading from "../atoms/Heading";
import AuthForm from "../molecules/AuthForm";

const Login = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

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

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      if (response.status === 200) {
        login(response.data.token);
        navigate("/");
      }
    } catch (err) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <Heading title="Login" />
      <AuthForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        buttonText="Login"
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Login;
