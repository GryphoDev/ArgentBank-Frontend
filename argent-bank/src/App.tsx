import { useEffect } from "react";
import { Router } from "./routes";
import "./styles/global.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { fetchUserInfo } from "./features/userSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) dispatch(fetchUserInfo(token));
  }, [dispatch]);

  return <Router />;
}
export default App;
