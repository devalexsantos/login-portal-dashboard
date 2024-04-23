import { useState } from 'react';
import products from '@/data/products.json';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCcw } from 'lucide-react';

interface notFound {
    id: string;
}

export function UpdateProducts(){
    const [status, setStatus] = useState('');
    const [notFound, setNotFound] = useState<notFound[]>([  ]);
    const [found, setFound] = useState(0);
    const [loading, setLoading] = useState(false);

    const productsList = products;

    async function searchProductsWebLogin(id: string){
        const response = await fetch(`https://login-api-products-log395view.e1jmxi.easypanel.host/product/${id}`).then(res => res.json())
        if(response.error){
            setNotFound(prev => [...prev, {id}])
        } else {
            setStatus(`Atualizando ${id} - ${response[0].DESCR_PRODUTO}`)
            setFound(prev => prev + 1)
        }
    }

    async function timeOut(){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Finalizado');
            }, 5000)
        })
    }

    const percentTotal = ((found + notFound.length) / productsList.length) * 100;

    async function handleSearchProducts(){
        setLoading(true);
        for(let i = 0; i < productsList.length; i++){
            if(i > 0 && i % 50 === 0){
                setStatus('Aguardando 5 segundos...');
                await timeOut();
            }
            await searchProductsWebLogin(productsList[i].sku)
        }
        setLoading(false);
    }



    
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-xl font-bold text-primary">Dashboard</h1>
            <Button 
                onClick={handleSearchProducts} 
                className="max-w-[200px] flex items-center gap-3"
                disabled={loading}
            >
            <RefreshCcw size={22}/>
                Atualizar produtos
            </Button>
            <p className="text-sm text-muted-foreground">{status}</p>
            <ul>
                <li className="text-sm">Não encontrados:</li>
                {notFound.map((item, index) => (
                    <li key={index} className="text-red-500 text-sm">- {item.id}</li>
                ))}
            </ul>
            <p className="text-sm text-muted-foreground">Progresso total: {percentTotal.toFixed(2)}%</p>
            <Progress value={percentTotal} />
        </div>
    )
}