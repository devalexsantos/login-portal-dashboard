import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCcw } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

interface notFound {
    id: string;
}

export function UpdateSomeProducts(){
    const [status, setStatus] = useState('');
    const [notFound, setNotFound] = useState<notFound[]>([]);
    const [productsList, setProductsList] = useState(['']);
    const [found, setFound] = useState(0);

    const formSchema = z.object({
        skus: z.string()
    })

    type FormType = z.infer<typeof formSchema>;

    const { handleSubmit, register, formState: { isSubmitting } } = useForm<FormType>();

    const PRODUCTS_API_URL = import.meta.env.VITE_API_PRODUCTS_URL;
    const PRODUCTS_API_URL_WBUY = import.meta.env.VITE_API_PRODUCTS_WBUY;
    const AUTH_TOKEN_WBUY = import.meta.env.VITE_AUTH_TOKEN_WBUY;

    async function updateProductWbuy({sku, valor, estoque_total}: {sku: string, valor: number, estoque_total: number, estoque_cd: number}){
       const active = estoque_total < 3 ? '0': '1';


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
                        quantidade: estoque_total === 0 ? 1 : estoque_total,
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
        }

    }

    async function searchProductsWebLogin(id: string){
        const response = await fetch(`${PRODUCTS_API_URL}/${id}`).then(res => res.json())
        if(response.error){
            setNotFound(prev => [...prev, {id}])
        } else {
            if(response.length > 0){
                setStatus(`Atualizando ${id} - ${response[0].descr_produto}`)
                const valorComposicao = response[0].vl_composicao;
                const valorAvulso = response[0].vl_avulso_site;

                const qtd_estoque_espatodeas = response[0].qtd_estoque_espatodeas;
                const qtd_estoque_cd = response[0].qtd_estoque_cd < 0 ? 0 : response[0].qtd_estoque_cd;
                const qtd_estoque_ssa = response[0].qtd_estoque_ssa < 0 ? 0 : response[0].qtd_estoque_ssa;
                const qtd_estoque_igua = response[0].qtd_estoque_igua < 0 ? 0 : response[0].qtd_estoque_igua;

                const estoque_marketplace = response[0].qtd_estoque_mkt;

                const qtd_mkt = estoque_marketplace < 4 ? 0 : estoque_marketplace; 

                const estoque_total =  qtd_estoque_espatodeas + qtd_estoque_cd + qtd_estoque_ssa + qtd_estoque_igua + qtd_mkt;

                const valor = valorComposicao === null ? valorAvulso : valorComposicao;

                const estoque_cd = qtd_estoque_cd;
                
                setFound(prev => prev + 1)

                await updateProductWbuy({sku: id, valor, estoque_total, estoque_cd})
            } else {
                setNotFound(prev => [...prev, {id}])
            }
        }
    }

    

    const percentTotal = ((found + notFound.length) / productsList.length) * 100;

    async function handleSearchProducts(data: FormType){
        const skusArray = data.skus.split('\n');
        setProductsList(skusArray);
        
        for(let i = 0; i < skusArray.length; i++){
            await searchProductsWebLogin(skusArray[i])
        }
    }


    
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-xl font-bold text-primary">Atualizar alguns Produtos</h1>
            <form onSubmit={handleSubmit(handleSearchProducts)} className="flex flex-col gap-6">
                <Textarea placeholder='Coloque os SKUs 01 por linha' required {...register("skus")}/>
                <Button 
                    className="max-w-[200px] flex items-center gap-3"
                    disabled={isSubmitting}
                >
                <RefreshCcw size={22}/>
                    Atualizar produtos
                </Button>
            </form>
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