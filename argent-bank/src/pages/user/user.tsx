import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { AccountBox } from "../../components/accountBox/accountBox";
import { Button } from "../../components/button/button";
import { Form } from "../../components/form/form";
import { editUsername } from "../../features/userSlice";

export function User() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [edit, setEdit] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    userName: string;
  } | null>(null);

  const accountBoxData = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
      buttonClass: "transaction-button",
      buttonValue: "View transactions",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
      buttonClass: "transaction-button",
      buttonValue: "View transactions",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
      buttonClass: "transaction-button",
      buttonValue: "View transactions",
    },
  ];

  const fields = [
    {
      wrapperClass: "input-flex",
      id: "username",
      type: "text",
      content: "User name:",
      placeholder: userDetails?.userName,
    },
    {
      wrapperClass: "input-flex",
      id: "firstname",
      type: "text",
      content: "First name:",
      placeholder: userDetails?.firstName,
      disabled: true,
    },
    {
      wrapperClass: "input-flex",
      id: "lastname",
      type: "text",
      content: "Last Name:",
      placeholder: userDetails?.lastName,
      disabled: true,
    },
  ];

  const handleCancel = () => {
    setEdit(false);
  };

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const username = formData.get("username");
    if (username && typeof username === "string" && token) {
      dispatch(editUsername({ username, token }));
    }
    e.currentTarget.reset();
    handleCancel();
  };

  const handleClick = () => {
    console.log("transaction click");
  };

  const submitBtns = [
    {
      btnClass: "sign-in-button",
      content: "Save",
      type: "submit" as const,
    },
    {
      btnClass: "sign-in-button",
      content: "Cancel",
      onClick: handleCancel,
      type: "button" as const,
    },
  ];

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
            fields={fields}
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
          onClick={handleClick}
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
