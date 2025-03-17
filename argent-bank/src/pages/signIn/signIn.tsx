import { FormEvent, useEffect, useState } from "react";
import { Form } from "../../components/form/form";
import { loginUser, fetchUserInfo } from "../../reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { fields, submitBtns } from "./data";

export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { authInfo, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    if (authInfo) {
      if (rememberMe) {
        localStorage.setItem("token", authInfo.body.token);
      } else {
        sessionStorage.setItem("token", authInfo.body.token);
      }
      dispatch(fetchUserInfo(authInfo.body.token));
      navigate("/profile");
    }
  }, [authInfo, rememberMe, dispatch, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rememberMe = formData.get("remember-me") === "on";
    setRememberMe(rememberMe);

    const userAuthData = {
      email: formData.get("username"),
      password: formData.get("password"),
    };
    dispatch(loginUser(userAuthData));
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <Form fields={fields} submitBtns={submitBtns} onSubmit={handleSubmit} />
      </section>
    </main>
  );
}
