import { ButtonProps } from "./type";

export function Button({ onClick, btnClass, content, type }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={btnClass}>
      {content}
    </button>
  );
}
