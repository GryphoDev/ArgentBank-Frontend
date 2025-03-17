import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { AccountBox } from "../../components/accountBox/accountBox";
import { Button } from "../../components/button/button";
import { Form } from "../../components/form/form";
import { editUsername } from "../../features/userSlice";
import { accountBoxData, fields, submitBtns } from "./data";
import { userDetailsProps } from "./type";

export function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user);
  const [edit, setEdit] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<userDetailsProps | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      setUserDetails({
        firstName: user.userDetails?.body.firstName || "",
        lastName: user.userDetails?.body.lastName || "",
        userName: user.userDetails?.body.userName || "",
      });
    } else {
      navigate("/");
    }
  }, [setUserDetails, navigate, user.userDetails]);

  const handleCancel = () => {
    setEdit(false);
  };

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    if (username && typeof username === "string" && token) {
      dispatch(editUsername({ username, token }));
    }
    e.currentTarget.reset();
    handleCancel();
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {`${userDetails?.firstName} ${userDetails?.lastName}`}
        </h1>

        <Button
          onClick={() => setEdit(true)}
          btnClass={`edit-button ${edit ? "none" : ""}`}
          content={"Edit Name"}
        />

        <div className={`form-box ${edit ? "visible" : ""}`}>
          <Form
            fields={fields(userDetails)}
            submitBtns={submitBtns}
            btnContainerClass={"btns-container-flex"}
            formClass={"form-container"}
            onSubmit={handleEdit}
          />
        </div>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accountBoxData.map((box) => (
        <AccountBox
          key={box.title}
          title={box.title}
          amount={box.amount}
          description={box.description}
          buttonClass={box.buttonClass}
          buttonValue={box.buttonValue}
        />
      ))}
    </main>
  );
}
