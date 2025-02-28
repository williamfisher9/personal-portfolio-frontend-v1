import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../constants/Constants";

const ScrollButton = () => {
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const theme = useContext(ThemeContext)

  useEffect(() => {
    window.addEventListener("scroll", showOrHideScrollButton);

    return () => window.removeEventListener("scroll", showOrHideScrollButton);
  }, []);

  const showOrHideScrollButton = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setScrollButtonVisible(true);
    } else if (scrolled <= 300) {
      setScrollButtonVisible(false);
    }
  };

  const moveToTheTop = () => {
    window.scrollTo({ top: 0 });
  };

  return scrollButtonVisible ? (
    <div
      className={`size-12 rounded-full fixed bottom-2 right-2 flex justify-center items-center 
        select-none cursor-pointer hover:scale-110 ${theme.theme == 'dark' ? 'bg-teal-500' : 'bg-indigo-500'}`}
      onClick={moveToTheTop}
    >
      <span className={`material-symbols-rounded text-4xl ${theme.theme == 'dark' ? 'text-black' : 'text-white'}`}>
        stat_2
      </span>
    </div>
  ) : null;
};

export default ScrollButton;
