import React, { useEffect, useState } from "react";
import { Input } from "antd";

interface TextInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoCapitalize?: string;
  isSubmit?: boolean;
  status?: "error" | "warning" | "success";
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  placeholder,
  value,
  onChange = () => {},
  disabled,
  readOnly,
  required,
  autoFocus,
  autoCapitalize,
  isSubmit,
  status,
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      setError(!value);
    }
  }, [value, isSubmit]);

  const inputPlaceholder = error ? "Please Fill This Field" : placeholder;

  const inputStyle = {
    width: "100%",
    height: "auto",
    backgroundColor: readOnly ? "#F1F1F1" : undefined,
  };

  const handleFocus = () => {
    setError(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      {type === "password" ? (
        <>
          <Input.Password
            placeholder="Input password"
            value={value}
            onChange={handleChange}
            readOnly={readOnly}
            required={required}
            autoFocus={autoFocus}
            autoCapitalize={autoCapitalize}
            disabled={disabled}
            style={inputStyle}
          />
          {error && (
            <p className="text-xs text-red-500 italic font-semibold">
              Please Fill This Field!
            </p>
          )}
        </>
      ) : type === "perjadin" ? (
        <>
          <Input
            placeholder={inputPlaceholder}
            value={value}
            onChange={handleChange}
            readOnly={readOnly}
            required={required}
            autoFocus={autoFocus}
            autoCapitalize={autoCapitalize}
            disabled={disabled}
            status={error ? "error" : status === "success" ? undefined : status}
            style={inputStyle}
            onFocus={handleFocus}
          />
        </>
      ) : (
        <>
          <Input
            placeholder={inputPlaceholder}
            value={value}
            onChange={handleChange}
            readOnly={readOnly}
            required={required}
            autoFocus={autoFocus}
            autoCapitalize={autoCapitalize}
            disabled={disabled}
            status={error ? "error" : status === "success" ? undefined : status}
            style={inputStyle}
            onFocus={handleFocus}
          />
          {error && (
            <p className="text-xs text-red-500 italic font-semibold">
              Please Fill This Field!
            </p>
          )}
        </>
      )}
    </>
  );
};

export default TextInput;
