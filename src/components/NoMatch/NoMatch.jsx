import { useNavigate } from "react-router-dom";

const NoMatch = () => {
    const navigate = useNavigate()    

    return <div
          className={`md:w-full md:h-[700px] max-[768px]:h-[500px] max-[550px]:h-[300px] flex justify-center items-center`}
        >
          <div
            className={`relative md:w-[700px] md:h-[700px] max-[768px]:h-[500px] max-[768px]:w-[500px] max-[550px]:h-[300px] max-[550px]:w-[300px]`}
          >
            <img
              src="404.png"
              className={`absolute w-full h-full rounded-xl`}
              alt="profile-image"
            />

            <a className={`absolute max-[768px]:bottom-[-50px] max-[768px]:text-sm max-[768px]:px-1 md:top-8 left-[50%] translate-x-[-50%] 
                flex justify-center items-center bg-[#872845] text-xl text-white drop-shadow-md
                cursor-pointer px-8 py-2 rounded-md hover:shadow-2xl`} onClick={() => navigate("/home")}>
                  GO TO HOME PAGE
                </a>
          </div>
        </div>
}

export default NoMatch;