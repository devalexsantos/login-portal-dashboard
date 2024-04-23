import { Outlet } from "react-router-dom"
import { Sidebar } from "./components/Sidebar"

export function AppLayout(){
    return(
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex-col">
                <div className="container py-8">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}