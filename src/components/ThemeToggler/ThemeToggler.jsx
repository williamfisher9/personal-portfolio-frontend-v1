import { useContext } from "react";
import { ThemeContext } from "../../constants/Constants";
import './ThemeToggler.css'

const ThemeToggler = () => {
  const theme = useContext(ThemeContext);

  const toggleTheme = (type) => {
    window.localStorage.setItem("theme", type);
      theme.setTheme(type);
  };

  const getDarkTheme = () => {
    return (
      <>
        <span className="material-symbols-rounded text-white absolute left-2 top-[50%] translate-y-[-50%]">light_mode</span>
        <div
          className={`theme-toggler-btn  rounded-r-full right-1 bg-teal-500`}
          onClick={() => toggleTheme("light")}
        >
          <span className="material-symbols-rounded text-black">dark_mode</span>
        </div>
      </>
    );
  };

  const getLightTheme = () => {
    return (
      <>
        <div
          className={`theme-toggler-btn rounded-l-full left-1 bg-yellow-500`}
          onClick={() => toggleTheme("dark")}
        >
          <span className={`material-symbols-rounded  text-black`}>light_mode</span>
        </div>
        <span className="material-symbols-rounded text-white absolute right-2 top-[50%] translate-y-[-50%]">dark_mode</span>
      </>
    );
  };

  return (
    <div className={`relative rounded-3xl w-[75px] h-10 ${theme.theme == 'dark' ? 'bg-zinc-800' : 'bg-indigo-500'}`}>
      {theme.theme == "dark" ? getDarkTheme() : getLightTheme()}
    </div>
  );
};

export default ThemeToggler;
