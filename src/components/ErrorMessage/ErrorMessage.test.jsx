import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage Component", () => {
  const defaultProps = {
    message: "Test message",
    type: "error",
  };

  it("should render error message with default type", () => {
    render(<ErrorMessage message={defaultProps.message} />);

    const messageElement = screen.getByText(defaultProps.message);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass("message-container");
    expect(messageElement).toHaveClass("error");
  });

  it("should render message with custom type", () => {
    const customType = "success";
    render(<ErrorMessage message={defaultProps.message} type={customType} />);

    const messageElement = screen.getByText(defaultProps.message);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass("message-container");
    expect(messageElement).toHaveClass(customType);
  });

  it("should render empty message", () => {
    render(<ErrorMessage message="" />);

    const messageElements = screen.getAllByText("");
    expect(messageElements.length).toBeGreaterThan(0);
  });

  it("should render message with custom className", () => {
    const customClass = "custom-message";
    render(
      <ErrorMessage message={defaultProps.message} className={customClass} />
    );

    const messageElement = screen.getByText(defaultProps.message);
    expect(messageElement).toHaveClass(customClass);
  });

  it("should handle long messages", () => {
    const longMessage =
      "This is a very long message that should be properly displayed in the error message component without any issues or truncation";
    render(<ErrorMessage message={longMessage} />);

    const messageElement = screen.getByText(longMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it("should handle special characters in message", () => {
    const specialMessage = "Error: 404! @#$%^&*()";
    render(<ErrorMessage message={specialMessage} />);

    const messageElement = screen.getByText(specialMessage);
    expect(messageElement).toBeInTheDocument();
  });
});
