import { useState } from "react";
import Contact from "./components/Contact/Contact";
import Hero from "./components/Hero/Hero";
import IntroductoryMessage from "./components/IntroductoryMessage/IntroductoryMessage";
import Portfolio from "./components/Portfolio/Portfolio";
import ScrollButton from "./components/ScrollButton/ScrollButton";
import Skills from "./components/Skills/Skills";
import { ThemeContext, UserContext } from "./constants/Constants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Blog from "./components/Blog/Blog";
import BlogPostDisplay from "./components/Blog/BlogPost/BlogPostDisplay";
import BlogPost from "./components/Blog/BlogPost/BlogPost";
import NoMatch from "./components/NoMatch/NoMatch";

const App = () => {
  const [theme, setTheme] = useState(window.localStorage.getItem('theme') || "dark");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false)

  return (
    <UserContext.Provider value={{isAuthenticated, setAuthenticated, showLoginForm, setShowLoginForm}}>
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div data-theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/portfolio" element={<Layout />}>
                <Route index element={<><Hero /><IntroductoryMessage /><Skills /><Contact /><Portfolio /><ScrollButton /></>}></Route>
                <Route path="/portfolio/home" element={<><Hero /><IntroductoryMessage /><Skills /><Contact /><Portfolio /><ScrollButton /></>}></Route>
                <Route path="/portfolio/blog" element={<Blog />}></Route>
                <Route path="/portfolio/blog/posts/new" element={<BlogPost mode="new" />}></Route>
                <Route path="/portfolio/blog/posts/edit/:id" element={<BlogPost mode="edit" />}></Route>
                <Route path="/portfolio/blog/posts/:id" element={<BlogPostDisplay />}></Route>
                <Route path="*" element={<NoMatch />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
    </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
