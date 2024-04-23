import { Button } from "@/components/ui/button";
import { app } from "@/services/firebase";
import { getAuth, signOut } from 'firebase/auth';
import { ChevronDown, LogOut, Package, PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar(){
    const auth = getAuth(app);

    const handleSignout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="w-[250px] border-r h-full min-h-screen p-8 flex flex-col gap-6">
            <h1 className="font-bold text-primary text-xl">Portal Login</h1>
            <nav className="flex-1 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                        Produtos
                        <ChevronDown size={16} />
                    </span>
                    <Link to="/dashboard/atualizar-produtos" className="text-muted-foreground text-sm flex items-center gap-2 rounded-md px-4 py-2 hover:bg-zinc-50">
                        <Package size={16}/> Atualizar Todos
                    </Link>
                    <Link to="/dashboard/atualizar-alguns-produtos" className="text-muted-foreground text-sm flex items-center gap-2 rounded-md px-4 py-2 hover:bg-zinc-50">
                        <PackageSearch size={16}/> Atualizar Alguns
                    </Link>
                </div>
            </nav>
            <Button onClick={()=> handleSignout()} className="flex items-center gap-3">
                <LogOut size={16} />
                Sair
            </Button>
        </div>
    )
}