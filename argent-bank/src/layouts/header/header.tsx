import logo from "/images/argentBankLogo.png";
import { LinkWidhIcon } from "../../components/linkWithIcon/linkWithIcon";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../features/userSlice";

export function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const username = user.userDetails?.body.userName;
  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setAuthenticate(true);
    }
  }, [user.userDetails]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(logout());
    setAuthenticate(false);
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
        {!authenticate ? (
          <LinkWidhIcon
            location="./sign-in"
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
