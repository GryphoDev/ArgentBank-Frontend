type ButtonProps = {
  btnClass: string;
  content: string;
};

export function Button({ btnClass, content }: ButtonProps) {
  return <button className={btnClass}>{content}</button>;
}
