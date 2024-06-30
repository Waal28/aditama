import { useAppState } from "../context/AppStateContext";
import { IconError, IconSuccess } from "./icons";

export default function Toast() {
  const { toast } = useAppState();
  if (toast.show)
    return (
      <div className="toast toast-top toast-end z-[1000]">
        <div
          className={`alert ${
            toast.success ? "alert-success" : "alert-error"
          } text-white flex`}
        >
          {toast.success ? <IconSuccess /> : <IconError />}
          <span className="text-sm">{toast.message}</span>
        </div>
      </div>
    );
}
