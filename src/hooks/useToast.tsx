import toast, { Renderable, ToastPosition } from "react-hot-toast";
import { colors } from "@/constants/colors";

interface ToastOptions {
  title: string;
  description?: string;
  icon?: Renderable;
  position?: ToastPosition;
  customStyle?: React.CSSProperties;
}

const useToast = () => {
  const baseStyle: React.CSSProperties = {
    padding: "16px",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "none",
    minWidth: "300px",
  };

  const renderMessage = (title: string, description?: string) => (
    <div className="flex flex-1 flex-col">
      <strong>{title}</strong>
      {description && <p style={{ margin: "4px 0 0" }}>{description}</p>}
    </div>
  );

  return {
    success: (options: ToastOptions) =>
      toast.success(renderMessage(options.title, options.description), {
        position: options.position ?? "top-center",
        style: {
          ...baseStyle,
          background: "#EAF9ED",
          borderLeft: "4px solid #4CAF50",
          color: "#2E7D32",
          ...options.customStyle,
        },
        icon: options.icon,
      }),

    error: (options: ToastOptions) =>
      toast.error(renderMessage(options.title, options.description), {
        position: options.position ?? "top-center",
        style: {
          ...baseStyle,
          background: "#FDECEA",
          borderLeft: "4px solid #D32F2F",
          color: "#D32F2F",
          ...options.customStyle,
        },
        icon: options.icon,
      }),

    warning: (options: ToastOptions) =>
      toast(renderMessage(options.title, options.description), {
        position: options.position ?? "top-center",
        style: {
          ...baseStyle,
          background: "#FFF4E5",
          borderLeft: "4px solid #ED6C02",
          color: "#ED6C02",
          ...options.customStyle,
        },
        icon: options.icon ?? "⚠️",
      }),

    info: (options: ToastOptions) =>
      toast(renderMessage(options.title, options.description), {
        position: options.position ?? "top-center",
        style: {
          ...baseStyle,
          background: "#E3F2FD",
          borderLeft: "4px solid #0288D1",
          color: "#0288D1",
          ...options.customStyle,
        },
        icon: options.icon,
      }),

    customToast: (
      formRef: React.RefObject<HTMLFormElement | null>,
      { title, description, icon, customStyle }: ToastOptions
    ) => {
      if (!formRef.current) return;

      const rect = formRef.current.getBoundingClientRect();
      const toastId = toast.custom(
        (t) => (
          <div
            className={`border-5 shadow-md p-4 ${
              t.visible ? "animate-fade-in" : "animate-fade-out"
            }`}
            style={{
              position: "absolute",
              top: `${rect.bottom + window.scrollY}px`,
              left: `${rect.left + window.scrollX - 15}px`,
              width: `${rect.width}px`,
              zIndex: 1000,
              background: colors.green,
              borderLeft: `5px solid ${colors.greenLime}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              ...customStyle,
            }}
          >
            {icon && <span className="mr-5">{icon}</span>}
            {renderMessage(title, description)}
          </div>
        ),
        { duration: 4000 }
      );

      return toastId;
    },
  };
};

export default useToast;
