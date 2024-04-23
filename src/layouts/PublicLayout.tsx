import { Outlet } from "react-router-dom";

export function PublicLayout(){
    return(
        <div className="flex flex-col justify-center items-center">
            <div className="container flex justify-center w-full">
                <Outlet />
            </div>
        </div>
    )
}