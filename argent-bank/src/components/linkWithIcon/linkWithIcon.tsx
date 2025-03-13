import { Link } from "react-router-dom";

type LinkWidhIconPops = {
  location: string;
  icon: string;
  content: string;
};

export function LinkWidhIcon({ location, icon, content }: LinkWidhIconPops) {
  return (
    <Link to={location} className="main-nav-item">
      <i className={icon}></i>
      {content}
    </Link>
  );
}
