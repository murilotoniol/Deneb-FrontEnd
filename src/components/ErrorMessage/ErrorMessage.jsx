import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ message, type = "error" }) => {
  return <div className={`message-container ${type}`}>{message}</div>;
};

export default ErrorMessage;
