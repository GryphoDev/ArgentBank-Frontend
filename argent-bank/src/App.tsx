import { useEffect } from "react";
import { Router } from "./routes";
import "./styles/global.css";
import { useDispatch } from "react-redux";
import { setAuthenticate } from "./features/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(setAuthenticate(true));
    if (!token) localStorage.clear();
  }, [dispatch]);

  return <Router />;
}
export default App;
