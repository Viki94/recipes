import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";
import Select from "../atoms/Select";

interface FormFieldProps {
  label: string;
  type: "text" | "number" | "textarea" | "select" | "password" | "email";
  name: string;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: string[];
}

const FormField: React.FC<FormFieldProps> = ({ label, type, name, value, placeholder, onChange, options }) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      {type === "textarea" ? (
        <TextArea name={name} value={value as string} placeholder={placeholder} onChange={onChange} />
      ) : type === "select" ? (
        <Select name={name} value={value as string} options={options || []} onChange={onChange} />
      ) : (
        <Input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
      )}
    </div>
  );
};

export default FormField;
