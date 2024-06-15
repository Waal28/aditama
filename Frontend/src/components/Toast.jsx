import { useAppState } from "../context/AppStateContext";

export default function Toast() {
  const { toast } = useAppState();
  if (toast.show)
    return (
      <div className="toast toast-top toast-end">
        <div
          className={`alert ${
            toast.success ? "alert-success" : "alert-error"
          } text-white`}
        >
          <span>{toast.message}</span>
        </div>
      </div>
    );
}
