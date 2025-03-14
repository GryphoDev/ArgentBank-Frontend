import { Link } from "react-router-dom";

type LinkWidhIconPops = {
  onClick?: () => void;
  location: string;
  icon: string;
  content: string;
};

export function LinkWidhIcon({
  onClick,
  location,
  icon,
  content,
}: LinkWidhIconPops) {
  return (
    <Link onClick={onClick} to={location} className="main-nav-item">
      <i className={icon}></i>
      {content}
    </Link>
  );
}
