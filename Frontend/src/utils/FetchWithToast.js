import { useAppState } from "../context/AppStateContext";
export default async function FetchWithToast(request) {
  const { HandleToast } = useAppState();
  try {
    const response = await request;
    const data = response.data;
    if (data.status === "failed") {
      console.log(data.message);
      HandleToast.error(data.message);
    }
    return data;
  } catch (error) {
    HandleToast.error(error.message);
  }
}
