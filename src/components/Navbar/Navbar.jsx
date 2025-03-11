import PropTypes from 'prop-types'
import './Navbar.css'
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext, UserContext } from '../../constants/Constants';
import { HashLink } from 'react-router-hash-link';

const Navbar = ({navOpenState, closeNav}) => {
    //const [activeLink, setActiveLink] = useState("home");

    const activeNavbarItemBox = useRef(null)
    const activeNavbarItem = useRef(null)
    const userContext = useContext(UserContext);

    const navbarItems = [
        {href: "/portfolio/home", label: "home", menuSize: "all", ref: activeNavbarItem},
        {href: "/portfolio/home#portfolio", label: "portfolio", menuSize: "all"},
        {href: "/portfolio/blog", label: "blog", menuSize: "all"},
        {href: "/portfolio/home#contact", label: "contact", menuSize: "all"}
    ]
    
    /*const handleNavbarItemClick = () => {
        
        // update old activeNavbarItem
        //activeNavbarItem.current?.classList.remove('text-white')
        //activeNavbarItem.current.classList.add('text-black')

        // set activeNavbarItem to the new event.target
        activeNavbarItem.current = event.target;
        //activeNavbarItem.current.classList.add('text-white')
        console.log("x")
        activeNavbarItemBox.current.classList.remove('border-black');
        activeNavbarItemBox.current.classList.remove('border-white');

        if(theme.theme == 'dark' && !navOpenState){
            activeNavbarItemBox.current.classList.add('border-black');
        }

        if(theme.theme == 'light' && !navOpenState){
            activeNavbarItemBox.current.classList.add('border-white');
        }
        
        activeNavbarItemBox.current.style.left = activeNavbarItem.current.offsetLeft + "px";
        activeNavbarItemBox.current.style.top = activeNavbarItem.current.offsetTop + "px";
        activeNavbarItemBox.current.style.width = activeNavbarItem.current.getBoundingClientRect().width + "px";
        activeNavbarItemBox.current.style.height = activeNavbarItem.current.getBoundingClientRect().height + "px";

        
    };*/

    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth)
            
            /*activeNavbarItemBox.current.style.left = activeNavbarItem.current.offsetLeft + "px";
            activeNavbarItemBox.current.style.top = activeNavbarItem.current.offsetTop + "px";
            activeNavbarItemBox.current.style.width = activeNavbarItem.current.getBoundingClientRect().width + "px";
            activeNavbarItemBox.current.style.height = activeNavbarItem.current.getBoundingClientRect().height + "px";*/

            if(window.innerWidth > 768){
                closeNav()
            }
        });      

        /*activeNavbarItem.current.classList.add('text-zinc-900')
        activeNavbarItemBox.current.style.left = activeNavbarItem.current.offsetLeft + "px";
        activeNavbarItemBox.current.style.top = activeNavbarItem.current.offsetTop + "px";
        activeNavbarItemBox.current.style.width = activeNavbarItem.current.getBoundingClientRect().width + "px";
        activeNavbarItemBox.current.style.height = activeNavbarItem.current.getBoundingClientRect().height + "px";*/

        return () => window.removeEventListener("resize", () => setScreenWidth(window.innerWidth));
    }, [])

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const theme = useContext(ThemeContext)


    return (
        <div className={`navbar-menu ${navOpenState == true && screenWidth < 768 ? (screenWidth < 500 ? 
        (theme.theme == "light" ? 'bg-indigo-500 w-full side-screen-navbar' : 'bg-zinc-800 w-full side-screen-navbar') : 
        (theme.theme == "light" ? 'bg-indigo-500 w-52 side-screen-navbar' : 'bg-zinc-800 w-44 side-screen-navbar')) : 
        (theme.theme == "light" ? 'bg-indigo-500 mid-screen-navbar' : 'bg-teal-500 mid-screen-navbar')}`}>

            {
                navOpenState == true ?
                    <span className="material-symbols-rounded absolute text-white text-3xl top-2 right-2 cursor-pointer" onClick={() => closeNav()}>close</span>
                : null
            }

            <div ref={activeNavbarItemBox} className='active-navbar-box'></div>

            
            {
                navbarItems
                .filter((item) => (screenWidth < 768 && item.menuSize == "all") || (screenWidth < 768 && item.menuSize == "small") || (screenWidth >= 768 && item.menuSize == "all"))
                .map(({href, label, ref}) => {
                    return <HashLink key={label} to={href} ref={ref} onClick={() => closeNav()}
                    className={`navbar-item ${theme.theme == 'dark' ? (navOpenState ? 'text-white' : 'text-black') : 'text-white'}`} 
                    >
                        {label}
                    </HashLink>
                })

                
            }

            {
navOpenState == true && screenWidth < 768 ?
<button onClick={() => {userContext.setShowLoginForm(true); closeNav();}}>SIGN IN</button>
:null
            }

        </div>
    )
}

Navbar.propTypes = {
    navOpenState: PropTypes.bool.isRequired,
    closeNav: PropTypes.func.isRequired
}

export default Navbar;