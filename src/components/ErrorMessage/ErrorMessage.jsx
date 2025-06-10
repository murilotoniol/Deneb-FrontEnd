import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ message, type = "error", className = "" }) => {
  return (
    <div className={`message-container ${type} ${className}`}>{message}</div>
  );
};

export default ErrorMessage;
