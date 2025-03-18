import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { AccountBox } from "../../components/accountBox/accountBox";
import { Button } from "../../components/button/button";
import { Form } from "../../components/form/form";
import { editUsername } from "../../reducer/userSlice";
import { accountBoxData, fields, submitBtns } from "./data";

export function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/");
    }
  }, [navigate, user]);

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
          {`${user.userDetails?.body.firstName} ${user.userDetails?.body.lastName}`}
        </h1>

        <Button
          onClick={() => setEdit(true)}
          btnClass={`edit-button ${edit ? "none" : ""}`}
          content={"Edit Name"}
        />

        <div className={`form-box ${edit ? "visible" : ""}`}>
          {user.userDetails && (
            <Form
              fields={fields(user.userDetails.body)}
              submitBtns={submitBtns(handleCancel)}
              btnContainerClass={"btns-container-flex"}
              formClass={"form-container"}
              onSubmit={handleEdit}
            />
          )}
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
