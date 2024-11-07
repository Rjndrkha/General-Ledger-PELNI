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
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      if (!value) {
        return setError(true);
      } else {
        return setError(false);
      }
    }
  }, [value, isSubmit]);

  const inputStyle = {
    width: readOnly ? "100%" : "50%",
    height: "auto",
    backgroundColor: readOnly ? "#F1F1F1" : "transparent",
  };

  const errorStyle = {
    marginTop: "8px", // Add some spacing between the input and the error message
    color: "#ff4d4f", // Red color for error message
    fontSize: "12px", // Smaller font size
    fontStyle: "italic", // Italicized font
    fontWeight: "600", // Semi-bold font weight
  };

  return (
    <div style={{ width: "100%" }}>
      {type === "password" ? (
        <>
          <Input.Password
            placeholder={placeholder || "input password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
            required={required}
            autoFocus={autoFocus}
            autoCapitalize={autoCapitalize}
            disabled={disabled}
            status={error ? "error" : ""}
            style={inputStyle}
          />
        </>
      ) : (
        <>
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
            required={required}
            autoFocus={autoFocus}
            autoCapitalize={autoCapitalize}
            disabled={disabled}
            status={error ? "error" : ""}
            style={inputStyle}
            onFocus={() => setError(false)}
          />
        </>
      )}

      {/* The error message appears below the input field */}
      {error && (
        <p style={errorStyle}>
          Please Fill This Field!
        </p>
      )}
    </div>
  );
};

export default TextInput;
