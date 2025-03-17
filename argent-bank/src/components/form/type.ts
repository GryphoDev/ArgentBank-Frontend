import { FormEvent } from "react";

export type FormProps = {
  fields: {
    wrapperClass: string;
    id: string;
    type: string;
    content: string;
    placeholder?: string | undefined;
    disabled?: boolean;
  }[];
  btnContainerClass?: string;
  submitBtns: {
    btnClass: string;
    content: string;
    onClick?: () => void;
    type?: "submit" | "button" | "reset";
  }[];
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  formClass?: string;
};
