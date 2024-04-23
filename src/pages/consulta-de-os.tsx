import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function ConsultaDeOS(){
    const API_OS_URL = import.meta.env.VITE_API_OS_URL
    const [osNumber, setOsNumber] = useState('')
    const [osStatus, setOsStatus] = useState('')

    const formSchema = z.object({
        os: z.string()
    })

    type FormType = z.infer<typeof formSchema>

    const { handleSubmit, register, formState: { isSubmitting } } = useForm<FormType>()

    const onSubmit = async (data: FormType) => {
        const response = await fetch(`${API_OS_URL}/${data.os}`).then(res => res.json())
        setOsNumber(data.os)
        if(response.error){
            setOsStatus('OS não encontrada')
            return;
        }
        if(response[0]?.descricao_status){
            setOsStatus(response[0]?.descricao_status)
        } else {
            setOsStatus('OS não encontrada.')
        }
            
    }

    return(
        <div className="flex flex-col gap-6 w-full max-w-3xl border rounded-xl p-8 mt-20 mx-4 items-center">
            <h1 className="text-2xl font-bold text-[#076F86]">Consulta de OS</h1>
            <p>Digite no campo abaixo o <strong>número</strong> da sua Ordem de Serviço para realizar a consulta:</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                <Input type="number" placeholder="Digite o Número da OS" {...register("os")} required />
                <Button disabled={isSubmitting} className="bg-[#076F86] hover:bg-[#1b92ad] flex items-center gap-3">
                    {isSubmitting ?
                    'Buscando...'
                    :
                    <>
                    <Search size={22}/>
                    Consultar
                    </>
                    }
                </Button>
            </form>
            {(osStatus && osNumber) !== '' && (
                <div className="flex flex-col gap-3 bg-zinc-100 text-[#076F86] w-full rounded-md p-8">
                    <span className="text-sm">Resultado:</span>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold">Número OS:</span>
                                <span>{osNumber}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold">Status:</span>
                                <span>{osStatus}</span>
                            </div>
                        </div>
                </div>
            )}
        </div>
    )
}