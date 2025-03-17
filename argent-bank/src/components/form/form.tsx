import { Button } from "../button/button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FormProps } from "./type";

export function Form({
  fields,
  submitBtns,
  btnContainerClass,
  onSubmit,
  formClass,
}: FormProps) {
  const { error } = useSelector((state: RootState) => state.user);

  return (
    <form onSubmit={onSubmit} className={formClass}>
      {fields.map((field) => {
        return (
          <div key={field.id} className={field.wrapperClass}>
            <label htmlFor={field.id}>{field.content}</label>
            <input
              type={field.type}
              name={field.id}
              id={field.id}
              placeholder={field.placeholder}
              disabled={field.disabled}
              required={field.type !== "checkbox"}
            />
          </div>
        );
      })}
      <p
        style={{ color: "red", fontWeight: "bold" }}
        className={`error-message ${error && "visible"}`}
      >
        {error && "Invalid username or password. Please try again."}
      </p>
      <div className={btnContainerClass}>
        {submitBtns.map((btn) => {
          return (
            <Button
              key={btn.content}
              btnClass={btn.btnClass}
              content={btn.content}
              onClick={btn.onClick}
              type={btn.type}
            />
          );
        })}
      </div>
    </form>
  );
}
