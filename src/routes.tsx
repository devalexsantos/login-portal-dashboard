import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { ConsultaDeOS } from "./pages/consulta-de-os";
import { AppLayout } from "./layouts/AppLayout";
import { UpdateProducts } from "./pages/atualizar-produtos";
import { UpdateSomeProducts } from "./pages/atualizar-alguns-produtos";
import { Login } from "./pages/login";
import { InactiveSomeProducts } from "./pages/inativar-produtos";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/consulta-de-os", element: <ConsultaDeOS /> },
    ],
  },
  {
    path: "/dashboard",
    element: <AppLayout />,
    children: [
      { path: "/dashboard/atualizar-produtos", element: <UpdateProducts /> },
      {
        path: "/dashboard/atualizar-alguns-produtos",
        element: <UpdateSomeProducts />,
      },
      {
        path: "/dashboard/inativar-alguns-produtos",
        element: <InactiveSomeProducts />,
      },
    ],
  },
]);
