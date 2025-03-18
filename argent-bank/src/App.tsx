import { useEffect } from "react";
import { Router } from "./routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { fetchUserInfo } from "./reducer/userSlice";
import { isAuthenticate } from "./reducer/userSlice";
import "./styles/global.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      dispatch(isAuthenticate());
      dispatch(fetchUserInfo(token));
    }
  }, [dispatch]);

  return <Router />;
}
export default App;
