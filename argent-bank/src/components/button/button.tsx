import { FormEvent } from "react";

type ButtonProps = {
  onClick?: (e: FormEvent) => void;
  btnClass: string;
  content: string;
  type?: "submit" | "reset" | "button";
};

export function Button({ onClick, btnClass, content, type }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={btnClass}>
      {content}
    </button>
  );
}
