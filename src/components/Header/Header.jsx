import { useContext, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Header.css";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import { ThemeContext, UserContext } from "../../constants/Constants";
import Login from "../Login/Login";
import Cookies from "js-cookie";

const Header = () => {
  const [navOpenState, setNavOpenState] = useState(false);

  const theme = useContext(ThemeContext)
  const userContext = useContext(UserContext)

  const closeNav = () => {
    setNavOpenState(false);
  };

  const handleSignout = () => {
    userContext.setAuthenticated(false);
    Cookies.remove("token")
  }

  return (
    <div className="w-full h-20 flex items-center justify-between px-10">

<Login closeLoginForm={() => userContext.setShowLoginForm(false)} navigateTo="/blog" showLoginForm={userContext.showLoginForm} />

      <a href="/">
        <img src={theme.theme == 'dark' ? 'bg-teal-logo.png' : 'bg-purple-logo.png'} className="size-16" alt="logo-image" />
      </a>

      <Navbar navOpenState={navOpenState} closeNav={closeNav} />

      <div className="flex gap-2">
          <ThemeToggler />

          {
            userContext.isAuthenticated ? 
            <button className={`header-btn ${theme.theme == 'dark' ? 'btn-dark-theme' : 'btn-light-theme'}`} onClick={handleSignout}>SIGN OUT</button>
            :<button className={`header-btn ${theme.theme == 'dark' ? 'btn-dark-theme' : 'btn-light-theme'}`} onClick={() => userContext.setShowLoginForm(true)}>SIGN IN BTN</button>
          }

          <span className={`menu-icon material-symbols-rounded ${theme.theme == 'dark' ? 'bg-teal-500/100 text-black' : 'bg-indigo-500/100 text-white'}`} onClick={() => setNavOpenState((prev) => !prev)}>
            {!navOpenState ? "menu" : "close"}
          </span>
      </div>
    </div>
  );
};

export default Header;
