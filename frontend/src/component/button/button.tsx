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
    <>
      <Button
        htmlType={htmlType}
        style={{
          backgroundColor: disabled ? "#F1F1F1" : color ? color : "#FF7A45",
          color: "#FFFFFF",
          width: width,
        }}
        className={className}
        disabled={disabled}
        onClick={onClick}
        loading={loading}
      >
        {text}
      </Button>
    </>
  );
};
export default ButtonDefault;
