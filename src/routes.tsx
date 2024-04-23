import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { ConsultaDeOS } from "./pages/consulta-de-os";

export const router = createBrowserRouter([
    {
      path: "/public",
      element: <PublicLayout />,
      children: [
        { path: "/public/consulta-de-os", element: <ConsultaDeOS />}
      ]
    }
  ]);