import { FormEvent, useEffect, useState } from "react";
import { Form } from "../../components/form/form";
import { loginUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { userInfo } = useSelector((state: RootState) => state.user);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rememberMe = formData.get("remember-me") === "on";
    setRememberMe(rememberMe);

    const userAuthData = {
      email: formData.get("username"),
      password: formData.get("password"),
    };
    await dispatch(loginUser(userAuthData));
  };

  useEffect(() => {
    if (userInfo) {
      if (rememberMe) {
        localStorage.setItem("token", userInfo.body.token);
      } else {
        sessionStorage.setItem("token", userInfo.body.token);
      }
      navigate("/profile");
    }
  }, [userInfo, navigate, rememberMe]);

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
