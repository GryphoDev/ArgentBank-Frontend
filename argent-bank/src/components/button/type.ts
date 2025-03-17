import { FormEvent } from "react";

export type ButtonProps = {
  onClick?: (e: FormEvent) => void;
  btnClass: string;
  content: string;
  type?: "submit" | "reset" | "button";
};
