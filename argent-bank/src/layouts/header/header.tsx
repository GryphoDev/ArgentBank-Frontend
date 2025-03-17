import logo from "/images/argentBankLogo.png";
import { LinkWidhIcon } from "../../components/linkWithIcon/linkWithIcon";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../reducer/userSlice";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const username = user.userDetails?.body.userName;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
        {!user.isAuthenticated ? (
          <LinkWidhIcon
            location="./login"
            icon="fa fa-user-circle"
            content=" Sign In "
          />
        ) : (
          <div>
            <LinkWidhIcon
              location="./profile"
              icon="fa fa-user-circle"
              content={` ${username} `}
            />
            <LinkWidhIcon
              onClick={handleLogout}
              location="./"
              icon="fa fa-sign-out"
              content=" Sign Out "
            />
          </div>
        )}
      </nav>
    </header>
  );
}
