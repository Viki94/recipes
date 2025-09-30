import React from "react";
import FormField from "../molecules/FormField";
import SubmitButton from "../atoms/SubmitButton";
import Message from "../atoms/Message";
import { NavLink } from "react-router-dom";

interface AuthFormProps {
    formData: {
        username?: string;
        email: string;
        password: string;
        confirmPassword?: string;
        firstName?: string;
        lastName?: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    buttonText: string;
    errorMessage?: string;
    successMessage?: string;
    isRegister?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
    formData,
    handleInputChange,
    handleSubmit,
    buttonText,
    errorMessage,
    successMessage,
    isRegister = false,
}) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
                <FormField
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                />
            )}
            <FormField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
            />
            <FormField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
            />
            {isRegister && (
                <>
                    <FormField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword || ""}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                    />
                    <FormField
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={formData.firstName || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                    />
                    <FormField
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={formData.lastName || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                    />
                </>
            )}
            <SubmitButton type="submit" text={buttonText} />

            {errorMessage && <Message message={errorMessage} type="error" />}
            {successMessage && <Message message={successMessage} type="success" />}

            {isRegister ? (
                <p className="text-center text-gray-600 text-sm mt-4">
                    Already have an account?{" "}
                    <NavLink to="/user/login" className="text-blue-500 font-bold hover:underline">
                        Login here
                    </NavLink>
                </p>
            ) : (
                <p className="text-center text-gray-600 text-sm mt-4">
                    Don't have an account?{" "}
                    <NavLink to="/user/register" className="text-blue-500 font-bold hover:underline">
                        Sign up here
                    </NavLink>
                </p>
            )}
        </form>
    );
};

export default AuthForm;
