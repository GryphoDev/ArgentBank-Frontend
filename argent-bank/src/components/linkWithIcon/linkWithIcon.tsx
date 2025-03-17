import { Link } from "react-router-dom";
import { LinkWidhIconPops } from "./type";

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
