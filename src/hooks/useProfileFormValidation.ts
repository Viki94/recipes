import { useState } from "react";

const useProfileFormValidation = () => {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const validateProfileForm = (formData: any) => {
    let validationErrors: string[] = [];

    if (!formData.email.trim()) validationErrors.push("Email is required.");
    if (!formData.firstName.trim()) validationErrors.push("First Name is required.");
    if (!formData.lastName.trim()) validationErrors.push("Last Name is required.");

    if (validationErrors.length > 0) {
      setErrorMessage(validationErrors);
      return false;
    }

    return true;
  };

  return { errorMessage, setErrorMessage, successMessage, setSuccessMessage, validateProfileForm };
};

export default useProfileFormValidation;
