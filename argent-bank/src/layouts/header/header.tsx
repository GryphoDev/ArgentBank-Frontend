import logo from "/images/argentBankLogo.png";
import { LinkWidhIcon } from "../../components/linkWithIcon/linkWithIcon";
import { Link } from "react-router-dom";

export function Header() {
  // TODO logic of links
  // const isProfilePage = window.location.pathname === "/profile";

  return (
    <header className="main-nav">
      <Link to={"/"} className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <nav>
        <LinkWidhIcon
          location="./sign-in"
          icon="fa fa-user-circle"
          content=" Sign In "
        />
      </nav>
    </header>
  );
}
