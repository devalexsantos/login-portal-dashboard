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

    const PRODUCTS_API_URL = import.meta.env.VITE_API_PRODUCTS_URL;
    const PRODUCTS_API_URL_WBUY = import.meta.env.VITE_API_PRODUCTS_WBUY;
    const AUTH_TOKEN_WBUY = import.meta.env.VITE_AUTH_TOKEN_WBUY;

    async function updateProductWbuy({sku, valor, estoque_total}: {sku: string, valor: number, estoque_total: number}){
        const active = estoque_total > 3 ? '1' : '0';
        
        const response = await fetch(`${PRODUCTS_API_URL_WBUY}/${sku}`,{
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN_WBUY}`,
            },
            body: JSON.stringify({
                ativo: active,
                estoque: [
                    {
                        cod_estoque: sku,
                        quantidade: estoque_total,
                        valor,
                        tipo: "3"
                    }
                ]
            })
        }).then(res => res.json())

        if(response.responseCode === 400){
            console.log("Erro ao atualizar produto na WBuy")
        } else {
            setStatus(`Atualizado ${sku} - WBuy`)
            console.log(response)
        }

    }

    async function searchProductsWebLogin(id: string){
        const response = await fetch(`${PRODUCTS_API_URL}/${id}`).then(res => res.json())
        if(response.error){
            setNotFound(prev => [...prev, {id}])
        } else {
            if(response.length > 0){
                setStatus(`Atualizando ${id} - ${response[0].descr_produto}`)
                const valor = response[0].vl_composicao;
                const qtd_estoque_loja = response[0].qtd_estoque_loja;
                const qtd_estoque_espatodeas = response[0].qtd_estoque_espatodeas;
                const qtd_estoque_cd = response[0].qtd_estoque_cd;
                const qtd_estoque_ssa = response[0].qtd_estoque_ssa;
                const qtd_estoque_igua = response[0].qtd_estoque_igua;

                const estoque_total = qtd_estoque_loja + qtd_estoque_espatodeas + qtd_estoque_cd + qtd_estoque_ssa + qtd_estoque_igua;

                setFound(prev => prev + 1)

                await updateProductWbuy({sku: id, valor, estoque_total})
            } else {
                setNotFound(prev => [...prev, {id}])
            }
        }
    }

    

    const percentTotal = ((found + notFound.length) / productsList.length) * 100;

    async function handleSearchProducts(){
        setLoading(true);
        for(let i = 0; i < productsList.length; i++){
            await searchProductsWebLogin(productsList[i].sku)
        }
        setLoading(false);
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-xl font-bold text-primary">Atualizar todos os produtos</h1>
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
                <li className="text-sm">Não encontrados ({notFound.length}):</li>
                {notFound.map((item, index) => (
                    <li key={index} className="text-red-500 text-sm">- {item.id}</li>
                ))}
            </ul>
            <p className="text-sm text-muted-foreground">Progresso total ({found + notFound.length}/{productsList.length}): {percentTotal.toFixed(2)}%</p>
            <Progress value={percentTotal} />
            
        </div>
    )
}