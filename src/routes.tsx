import { createBrowserRouter } from "react-router-dom";
import { UpdateProducts } from "./pages/atualizar-produtos";
import { AppLayout } from "./layouts/AppLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { ConsultaDeOS } from "./pages/consulta-de-os";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/atualizar-produtos", element: <UpdateProducts /> },
      ]
    },
    {
      path: "/public",
      element: <PublicLayout />,
      children: [
        { path: "/public/consulta-de-os", element: <ConsultaDeOS />}
      ]
    }
  ]);