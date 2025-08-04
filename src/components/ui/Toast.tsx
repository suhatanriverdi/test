import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  show: boolean;
  onClose: () => void;
}

export const Toast = ({ message, type, show, onClose }: ToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="toast toast-end">
      <div
        className={`alert ${
          type === "success" ? "alert-success" : "alert-error"
        }`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};
