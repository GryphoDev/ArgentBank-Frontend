import { Button } from "../button/button";

type AccountBoxProps = {
  title: string;
  amount: string;
  description: string;
  buttonClass: string;
  buttonValue: string;
};

export function AccountBox({
  title,
  amount,
  description,
  buttonClass,
  buttonValue,
}: AccountBoxProps) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <Button btnClass={buttonClass} content={buttonValue} />
      </div>
    </section>
  );
}
