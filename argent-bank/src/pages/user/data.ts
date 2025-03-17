import { userDetailsProps } from "./type";

export const accountBoxData = [
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

export const fields = (userDetails: userDetailsProps | null) => [
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

export const submitBtns = [
  {
    btnClass: "sign-in-button",
    content: "Save",
    type: "submit" as const,
  },
  {
    btnClass: "sign-in-button",
    content: "Cancel",
    onClick: () => {},
    type: "button" as const,
  },
];
