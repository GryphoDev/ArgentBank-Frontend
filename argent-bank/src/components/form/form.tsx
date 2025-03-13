import { FormEvent } from "react";
import { Button } from "../button/button";

type FormProps = {
  fields: {
    wrapperClass: string;
    id: string;
    type: string;
    content: string;
  }[];
  btnContainerClass?: string;
  submitBtns: {
    btnClass: string;
    content: string;
  }[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function Form({
  fields,
  submitBtns,
  btnContainerClass,
  onSubmit,
}: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => {
        return (
          <div key={field.id} className={field.wrapperClass}>
            <label htmlFor={field.id}>{field.content}</label>
            <input
              type={field.type}
              name={field.id}
              id={field.id}
              required={field.type !== "checkbox"}
            />
          </div>
        );
      })}
      <div className={btnContainerClass}>
        {submitBtns.map((btn) => {
          return (
            <Button
              key={btn.content}
              btnClass={btn.btnClass}
              content={btn.content}
            />
          );
        })}
      </div>
    </form>
  );
}
