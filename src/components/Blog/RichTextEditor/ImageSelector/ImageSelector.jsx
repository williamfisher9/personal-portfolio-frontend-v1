import { useContext, useEffect, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { BACKEND_URL, ThemeContext, UserContext } from "../../../../constants/Constants"
import { IoCloudUploadOutline } from "react-icons/io5"
import axios from "axios"
import Cookies from "js-cookie"
import Login from "../../../Login/Login"

const ImageSelector = ({visible, closeImageSelector, storeInsertedFile}) => {

    const [storedImages, setStoredImages] = useState([])
    const userContext = useContext(UserContext)

    const imageFileChooser = useRef()

    const removeImage = (id) => {
        axios.delete(`${BACKEND_URL}/portfolio/api/v1/blog/posts/images/${id}`, {headers: {"Authorization": `Bearer ${Cookies.get('token')}`}})
        .then((res) => {
            if(res.status==200){
                axios.get(`${BACKEND_URL}/portfolio/api/v1/blog/posts/images`, {headers: {"Authorization": `Bearer ${Cookies.get('token')}`}})
                .then((res) => {
                    setStoredImages(res.data.message)
                })
            }
        })
    }

    useEffect(() => {
        axios.get(`${BACKEND_URL}/portfolio/api/v1/blog/posts/images`, {headers: {"Authorization": `Bearer ${Cookies.get('token')}`}})
        .then((res) => {
            setStoredImages(res.data.message)
        })
        .catch((err) => {
            if(err.status == 401){
              userContext.setShowLoginForm(true)
            }
          })
    }, [])

    const handleFileInputChange = () => {
        let formData = new FormData()
        formData.append("file", event.target.files[0])

        axios.post(`${BACKEND_URL}/portfolio/api/v1/blog/posts/upload`, formData, {headers: {"Authorization": `Bearer ${Cookies.get('token')}`}})
        .then((res) => {
            if(res.status==200){
                axios.get(`${BACKEND_URL}/portfolio/api/v1/blog/posts/images`, {headers: {"Authorization": `Bearer ${Cookies.get('token')}`}})
                .then((res) => {
                    setStoredImages(res.data.message)
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }

    const addImageToEditor = (source) => {
        storeInsertedFile(source)
    }

    const theme = useContext(ThemeContext)

    if(!visible) return


    return <div className={`${theme.theme == "dark" ? "bg-teal-900" : "bg-indigo-900"} 
    fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50`}
    
    // required for the escape function below it to work
    tabIndex={0}
    onKeyDown={(key) => {
        if(key === "Escape"){
            closeImageSelector()
        }
    }}
    
    >


<Login closeLoginForm={() => userContext.setShowLoginForm(false)} navigateTo="" showLoginForm={userContext.showLoginForm} />



<div className="relative w-[80%] md:w-[760px] overflow-y-auto bg-black rounded-md p-8 gap-3  max-h-[80%] scrollbar-thin" >

        <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 
                border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 
                hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"  onClick={() => imageFileChooser.current.click()}>
                    
                    <div className="flex flex-col items-center justify-center gap-2">
                        <IoCloudUploadOutline className="text-4xl" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                </label>

                <input id="dropzone-file" type="file" className="hidden" ref={imageFileChooser} onChange={handleFileInputChange}/>
                
            </div> 
            
            <div>
                <button className="absolute right-2 top-2 z-50" onClick={closeImageSelector}>
                    <IoMdClose />
                </button>
            </div>

            <div className="border border-zinc-500 grid grid-cols-[repeat(auto-fill,_minmax(130px,_1fr))] gap-4 p-2  rounded-md border-dashed mt-4">
                {
                    storedImages.map(({id, name, source}) => {
                        return <div key={id} className="flex flex-col gap-1">
                            <div className="flex items-center justify-center">
                            <img src={source} className="size-36" alt={name} />
                            </div>
                            <div className="flex h-9">
                                <div className="flex items-center justify-center w-[50%] bg-red-400 text-black cursor-pointer hover:bg-red-500" onClick={() => removeImage(id)}>
                                <span className="text-2xl material-symbols-rounded">
delete
</span></div>
                                <div className="flex items-center justify-center w-[50%] bg-green-400 text-black cursor-pointer hover:bg-green-500" onClick={() => addImageToEditor(source)}><span className="text-2xl material-symbols-rounded">
check_circle
</span></div></div>
                            </div>
                    })
                }
            </div>

            </div>


            


            </div>

}

export default ImageSelector