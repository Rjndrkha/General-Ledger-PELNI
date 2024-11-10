import React from "react";
import { Button } from "antd";

interface ButtonDefaultProps {
  text: any;
  htmlType?: any;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  color?: string;
  isClick?: boolean;
  width?: string;
  loading?: boolean;
}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({
  htmlType,
  text,
  onClick,
  disabled,
  className,
  color,
  width,
  loading,
}) => {
  return (
    <Button
      htmlType={htmlType}
      style={{
        width: width,
      }}
      className={`${className} ${
        disabled ? "bg-gray-300" : color ? "" : "bg-blue-500"
      } text-white`}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
    >
      {text}
    </Button>
  );
};

export default ButtonDefault;
