import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";

export function InactiveSomeProducts() {
  const [status, setStatus] = useState("");
  const [, setProductsList] = useState([""]);
  const [productUpdating, setProductUpdating] = useState("");

  const formSchema = z.object({
    skus: z.string(),
  });

  type FormType = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<FormType>();

  const PRODUCTS_API_URL_WBUY = import.meta.env.VITE_API_PRODUCTS_WBUY;
  const AUTH_TOKEN_WBUY = import.meta.env.VITE_AUTH_TOKEN_WBUY;

  async function inactiveProductOnWbuy(sku: string) {
    setProductUpdating(sku);

    const response = await fetch(`${PRODUCTS_API_URL_WBUY}/${sku}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN_WBUY}`,
      },
      body: JSON.stringify({
        ativo: "0",
      }),
    }).then((res) => res.json());

    if (response.responseCode === 400) {
      console.log("Erro ao atualizar produto na WBuy");
    } else {
      setStatus(`Atualizado ${sku} - WBuy`);
    }
  }

  async function handleSearchProducts(data: FormType) {
    const skusArray = data.skus.split("\n");
    setProductsList(skusArray);

    for (let i = 0; i < skusArray.length; i++) {
      await inactiveProductOnWbuy(skusArray[i]);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-primary">
        Inativar alguns Produtos
      </h1>
      <form
        onSubmit={handleSubmit(handleSearchProducts)}
        className="flex flex-col gap-6"
      >
        <Textarea
          placeholder="Coloque os SKUs 01 por linha"
          required
          {...register("skus")}
        />
        <Button
          className="max-w-[200px] flex items-center gap-3"
          disabled={isSubmitting}
        >
          <RefreshCcw size={22} />
          Atualizar produtos
        </Button>
      </form>
      <p className="text-sm text-muted-foreground">{status}</p>
      {productUpdating && (
        <p className="text-sm text-muted-foreground">
          Atualizando {productUpdating}
        </p>
      )}
    </div>
  );
}
