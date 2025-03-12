import { useContext, useState } from "react";
import { BACKEND_URL, ThemeContext, UserContext } from "../../constants/Constants";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";

const Login = ({ closeLoginForm, navigateTo, showLoginForm }) => {
  const theme = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({})

  const userContext = useContext(UserContext)

  const navigate = useNavigate();

  const handleEnterButton = (event) => {
    if(event.key == "Enter")
      handleLoginBtnClick()
  }

  const handleLoginBtnClick = () => {
    event.preventDefault();
    let hasErrors = false;
    let newErrors = {username: "", password: "", form: ""}
    setErrors({...newErrors})

    if(username.trim() == ""){
      hasErrors = true;
      newErrors.username = "username is required"
    }

    if(password.trim() == ""){
      hasErrors = true;
      newErrors.password = "password is required"
    }

    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(username.trim() != "" && !re.test(username)){
      hasErrors = true;
      newErrors.username = "improper username format"
    }

    if(hasErrors)
      setErrors({...newErrors})

    if(!hasErrors){
      axios
      .post(`${BACKEND_URL}/api/v1/users/login`, { username, password })
      .then((res) => {
        Cookies.set("token", res.data.message);
        userContext.setAuthenticated(true);
        closeLoginForm();
        navigate(navigateTo);
      }).catch((err) => {
        setErrors({username: "", password: "", form: "error code " + err.status})
      });
    }
    
  };

  if(!showLoginForm)
    return

  return (
    <div
      className={`${theme.theme == "dark" ? "bg-teal-900" : "bg-indigo-900"}
            fixed inset-0 bg-black backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50`}
    >
      <form
        className={`relative w-[80%] md:w-[500px] overflow-y-auto ${
          theme.theme == "dark" ? "bg-black" : "bg-black"
        }
                  rounded-md flex flex-col items-center justift-start gap-10 py-16`}
      >

        <img src={theme.theme == 'dark' ? 'bg-teal-logo.png' : 'bg-purple-logo.png'} className="size-24 rounded-md" alt="logo-image" />

        <div>
          <button
            className="absolute right-4 top-4 p-2 z-50 bg-transparent"
            onClick={() => {closeLoginForm(); setErrors({username: "", password: "", form: ""});}}
          >
            <IoMdClose
              className={`${
                theme.theme == "dark" ? "text-teal-500" : "text-indigo-500"
              }`}
            />
          </button>
        </div>

        <div
          className={`relative w-[80%] h-12 border-2 rounded-md text-lg ${
            theme.theme == "dark"
              ? "border-teal-700 bg-teal-500/20 text-white"
              : "border-indigo-700 bg-indigo-500/20 text-white"
          }`}
        >
          <input
            type="text"
            placeholder="USERNAME"
            autoComplete="off"
            id="username"
            name="username"
            className="absolute top-0 left-0 w-full h-full pl-2 bg-transparent border-none outline-none rounded-md"
            onChange={() => setUsername(event.target.value)}
            onKeyDown={handleEnterButton}
          />

          <label htmlFor="username" className="absolute left-0 bottom-[-30px] text-red-500">{errors.username}</label>
        </div>

        <div
          className={`relative w-[80%] h-12 border-2 rounded-md text-lg ${
            theme.theme == "dark"
              ? "border-teal-700 bg-teal-500/20 text-white"
              : "border-indigo-700 bg-indigo-500/20 text-white"
          }`}
        >
          <input
            type="password"
            placeholder="PASSWORD"
            autoComplete="off"
            id="password"
            name="password"
            className="absolute top-0 left-0 w-full
             h-full pl-2 bg-transparent border-none outline-none rounded-md"
            onChange={() => setPassword(event.target.value)}
            onKeyDown={handleEnterButton}
          />

          <label htmlFor="password" className="absolute left-0 bottom-[-30px] text-red-500">{errors.password}</label>
        </div>

        <button
          className={` h-10 px-4 py-2 rounded-md 
            ${
              theme.theme == "dark"
                ? "text-black bg-teal-500 hover:bg-teal-600"
                : "text-white bg-indigo-500  hover:bg-indigo-600"
            }`}
          onClick={handleLoginBtnClick}
        >
          SIGN IN
        </button>

        <p className="absolute left-[50%] bottom-7 translate-x-[-50%] text-red-500">{errors.form}</p>
        
      </form>
    </div>
  );
};

export default Login;

Login.propTypes = {
  closeLoginForm: PropTypes.func.isRequired,
  navigateTo: PropTypes.string.isRequired,
  showLoginForm: PropTypes.bool.isRequired
};
