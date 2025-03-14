import { FormEvent, useEffect, useState } from "react";
import { Form } from "../../components/form/form";
import { loginUser, fetchUserInfo } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { authInfo } = useSelector((state: RootState) => state.user);
  const fields = [
    {
      wrapperClass: "input-wrapper",
      id: "username",
      type: "text",
      content: "Username",
    },
    {
      wrapperClass: "input-wrapper",
      id: "password",
      type: "text",
      content: "Password",
    },
    {
      wrapperClass: "input-remember",
      id: "remember-me",
      type: "checkbox",
      content: "Remember me",
    },
  ];

  const submitBtns = [
    {
      btnClass: "sign-in-button",
      content: "Sign In",
    },
  ];

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
