import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { BACKEND_URL, ThemeContext, UserContext } from "../../constants/Constants"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import Login from "../Login/Login"

const Blog = () => {
    const theme = useContext(ThemeContext)
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])

    const userContext = useContext(UserContext)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/posts`)
        .then((res) => {
            setPosts(res.data.message)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const handleNewPostRequest = () => {
        navigate('/portfolio/blog/posts/new')
    }

    const handleSearchBarChange = () => {
        axios.get(`${BACKEND_URL}/api/v1/blog/posts/search/${event.target.value == "" ? "-" : event.target.value}`)
        .then((res) => {
            setPosts(res.data.message)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const readPost = (id) => {
        navigate(`/portfolio/blog/posts/${id}`)
    }

    const editPost = (id) => {
        navigate(`/portfolio/blog/posts/edit/${id}`)
    }

    const deletePostById = (id) => {
        axios.delete(`${BACKEND_URL}/api/v1/blog/posts/${id}`, {headers: {"Authorization": `Bearer ${Cookies.get("token")}`}})
        .then((res) => {
            if(res.status == 200){
                axios.get(`${BACKEND_URL}/api/v1/blog/posts`)
        .then((res) => {
            setPosts(res.data.message)
        })
        .catch((err) => {
            console.log(err)
        })
            }
        })
        .catch((err) => {
            console.log(err)
            userContext.setShowLoginForm(true)
        })
    }

    return <div className={`px-2 rounded-md`}>
        <div className="flex gap-4 mb-14 items-center justify-center">

        <Login closeLoginForm={() => userContext.setShowLoginForm(false)} navigateTo="" showLoginForm={userContext.showLoginForm} />

        <div
          className={`relative h-12 border-2 rounded-md text-lg  w-[80%] md:w-[700px] ${
            theme.theme == "dark"
              ? "border-teal-700 bg-teal-500/20 text-white"
              : "border-indigo-700 bg-indigo-500/20 text-black"
          }`}
        >
          <input
            type="text"
            placeholder="Search Blog"
            id="searchBarVal"
            name="searchBarVal"
            className="absolute top-0 left-0 w-full
             h-full pl-2 bg-transparent border-none outline-none rounded-md"
            onChange={handleSearchBarChange}
          />
        </div>




                {
                    userContext.isAuthenticated ?
                    <a className={`btn flex gap-1 items-center h-12 justify-center ${theme.theme == 'dark' ? 'btn-dark-theme' : 'btn-light-theme'}`}
                    onClick={handleNewPostRequest}>
                        <span className="material-symbols-rounded">add</span>
                    </a>
                : null
                }
        </div>

        <div className=" grid grid-cols-3 place-items-center gap-10 max-[1100px]:grid-cols-2 max-[770px]:grid-cols-1">

            {
                posts.map(({id, title, description, main_image_source}) => {
                    
                    return <div key={id} className={`relative h-80 w-96 rounded-md p-4 border ${theme.theme == 'dark' ? 'border-teal-500' : 'border-indigo-500'}
                     max-[1500px]:scale-[0.9] max-[1350px]:scale-[0.8] max-[1220px]:scale-[0.7] max-[1100px]:scale-[0.9] max-[770px]:scale-[1] max-[500px]:scale-[0.9]`}>
                        
                        <div style={{clipPath: "polygon(9% 0, 100% 0%, 91% 100%, 0 100%)"}}
                         className={`absolute top-[-20px] laft-[20px] ${theme.theme == 'dark' ? 'bg-teal-800' : 'bg-indigo-800'} 
                         px-10 py-1 border border-teal-500`}>
                        <p className={`text-white font-semibold`}>{title}</p>
                        </div>

                        <div className="flex items-center justify-center py-4">
                            <img src={main_image_source} className="w-[70%] h-40 object-contain" />
                        </div>

                        <div className="line-clamp-3">
                            <p className="mt-2">{description}</p>
                        </div>
                        
                        

                        <div className="flex flex-col gap-5 mt-4 absolute right-0 top-4 translate-x-[50%]">
                            
                            <button className={`${theme.theme == 'dark' ? 'bg-teal-500 outline-teal-500 hover:bg-teal-600 text-black' : 'bg-indigo-500 outline-indigo-500 hover:bg-indigo-600 text-white'} 
                            rounded-full p-2 flex justify-center items-center  transition-all duration-100 outline-offset-1 hover:outline-[2px] outline-dashed outline-1  hover:outline-offset-4`}
                            onClick={() => readPost(id)}
                            ><span className="material-symbols-rounded">
                            file_open
                            </span>
                            </button>
                            
                            {
                                userContext.isAuthenticated ?
                                <>
                                    <button 
                                    onClick={() => editPost(id)}
                                    className={`${theme.theme == 'dark' ? 'bg-teal-500 hover:bg-teal-600 outline-teal-500 text-black' : 'bg-indigo-500 outline-indigo-500 hover:bg-indigo-600 text-white'} 
                                    rounded-full p-2 flex justify-center items-center  transition-all duration-100 outline-offset-1 hover:outline-[2px] outline-dashed outline-1  hover:outline-offset-4`}><span className="material-symbols-rounded">
                                    edit
                                    </span></button>
                                    <button 
                                    className={`${theme.theme == 'dark' ? ' bg-teal-500 hover:bg-teal-600 outline-teal-500 text-black' : 
                                        'bg-indigo-500 hover:bg-indigo-600 outline-indigo-500 text-white'} 
                                    rounded-full p-2 flex justify-center items-center transition-all duration-100 outline-offset-1 hover:outline-[2px] outline-dashed outline-1 hover:outline-offset-4`} 
                                    onClick={() => deletePostById(id)}><span className="material-symbols-rounded">
                                    delete
                                    </span></button>
                                </>
                                : null
                            }
                            
                        </div>

                    </div>
                })
            }

        </div>

    </div>
}

export default Blog