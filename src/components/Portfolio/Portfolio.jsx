import { useContext, useEffect, useState } from 'react'
import './Portfolio.css'
import { BACKEND_URL, ThemeContext, UserContext } from '../../constants/Constants'
import axios from 'axios'
import PortfolioItem from './PortfolioItem/PortfolioItem'
import Cookies from "js-cookie";
import { FaExternalLinkAlt } from 'react-icons/fa'
import { CgDetailsMore } from 'react-icons/cg'
import { GoLinkExternal } from 'react-icons/go'
import { MdDeleteOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Portfolio = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext)
    const theme = useContext(ThemeContext)

    const [items, setItems] = useState([])
    const [error, setError] = useState("")
    const [showNewPortfolioItem, setShowNewPortfolioItem] = useState(false)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/portfolio/items`)
        .then(res => {
            console.log(res.data.message)
            setItems(res.data.message)
        })
        .catch(err => {
            err.message
        })
    }, [])


    const deletePortfolioItem = (id) => {
        axios.delete(`${BACKEND_URL}/api/v1/portfolio/items/${id}`, {headers: { Authorization: `Bearer ${Cookies.get("token")}`}})
        .then(res => {
            if(res.status == 200)
            closeAndReloadData()
        })
        .catch(err => {
            err.message
        })
    }

    const handleNewPortfolioItemRequest = () => {
setShowNewPortfolioItem(true)
    }

    const closeAndReloadData = () => {
        axios.get(`${BACKEND_URL}/api/v1/portfolio/items`)
        .then(res => {
            console.log(res.data.message)
            setItems(res.data.message)
            setShowNewPortfolioItem(false);
        })
        .catch(err => {
            err.message
        })
    }

    return (
        <div>

            {
                showNewPortfolioItem && <PortfolioItem mode="new" closeModalAndReloadData={closeAndReloadData}/>
            }
            
            <div className='mt-8 flex justify-start items-center gap-2'>
                <a id="portfolio" className='text-[40px] font-bold'>My Portfolio</a>

                {
                    userContext.isAuthenticated &&
                    <a className={`btn flex gap-1 items-center h-10 justify-center ${theme.theme == 'dark' ? 'btn-dark-theme' : 'btn-light-theme'}`}
                    onClick={handleNewPortfolioItemRequest}>
                        <span className="material-symbols-rounded">add</span>
                    </a>
                }

            </div>

            <p className='pb-4'>
          Personal projects I built from scratch using the tools listed above.
        </p>

            <div className="flex pl-12 justify-around items-center gap-20 mt-8">
                
            </div>


            <div className=" grid grid-cols-3 place-items-center gap-10 max-[1100px]:grid-cols-2 max-[770px]:grid-cols-1">

{
    items.map(({id, title, description, link, main_image_source}) => {
        
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
                onClick={() => window.open(link, "_blank", "noreferrer")}
                >
                    <GoLinkExternal className='size-6'/>
                </button>

                <button className={`${theme.theme == 'dark' ? 'bg-teal-500 outline-teal-500 hover:bg-teal-600 text-black' : 'bg-indigo-500 outline-indigo-500 hover:bg-indigo-600 text-white'} 
                rounded-full p-2 flex justify-center items-center  transition-all duration-100 outline-offset-1 hover:outline-[2px] outline-dashed outline-1  hover:outline-offset-4`}
                onClick={() => navigate(`/portfolio/home/projects/${id}`)}
                >
                    <CgDetailsMore className='size-6'/>
                </button>
                
                {
                    userContext.isAuthenticated 
                    ?
                    <>
                        <button 
                        className={`${theme.theme == 'dark' ? ' bg-teal-500 hover:bg-teal-600 outline-teal-500 text-black' : 
                            'bg-indigo-500 hover:bg-indigo-600 outline-indigo-500 text-white'} 
                        rounded-full p-2 flex justify-center items-center transition-all duration-100 outline-offset-1 hover:outline-[2px] outline-dashed outline-1 hover:outline-offset-4`} 
                        onClick={() => deletePortfolioItem(id)}>
                            <MdDeleteOutline className='size-6'/>
                        </button>
                    </>
                    :
                    null
                }
                
            </div>

        </div>
    })
}

</div>
        </div>
    )
}

export default Portfolio