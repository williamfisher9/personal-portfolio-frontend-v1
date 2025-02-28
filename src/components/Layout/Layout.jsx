import { Outlet } from "react-router-dom"
import Header from "../Header/Header"

const Layout = () => {
    return <div className="min-h-screen">
    <Header />
    <div className="px-32 py-8 max-[1000px]:px-5 max-[1000px]:py-4">
        <Outlet />
        </div>
    </div>
}

export default Layout