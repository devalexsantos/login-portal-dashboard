import { Link } from "react-router-dom";

export function Sidebar(){
    return(
        <div className="w-[250px] border-r h-full min-h-screen p-8 flex flex-col gap-6">
            <h1 className="font-bold text-primary text-xl">Portal Login</h1>
            <nav className="flex flex-col gap-3">
                <Link to="/atualizar-produtos" className="text-muted-foreground text-sm">Atualizar Produtos</Link>
            </nav>
        </div>
    )
}