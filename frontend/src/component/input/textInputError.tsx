import React from 'react';
import { Input } from 'antd';

interface TextInputErrorProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

const TextInputError: React.FC<TextInputErrorProps> = ({
  placeholder,
  value,
  onChange,
  disabled,
  readOnly,
}) => (
  <Input
    status="error"
    placeholder={placeholder || "Fill This Field!"}
    value={value}
    onChange={(e) => onChange && onChange(e.target.value)}
    disabled={disabled}
    readOnly={readOnly}
    style={{ width: "100%", height: "auto" }}
  />
);

export default TextInputError;