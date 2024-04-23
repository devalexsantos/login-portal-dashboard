import { Outlet, useNavigate } from "react-router-dom"
import { Sidebar } from "./components/Sidebar"
import { app } from "@/services/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

export function AppLayout(){

    const navigate = useNavigate();

    const auth = getAuth(app);

    const [user, loading, error] = useAuthState(auth);

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Erro</div>
    }

    if(!user){
        navigate('/login');
    }

    return(
        <div className="flex h-full">
            <Sidebar />
            <div className="flex-1 flex-col">
                <div className="container py-8">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}