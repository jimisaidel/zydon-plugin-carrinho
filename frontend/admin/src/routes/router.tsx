import { Typography } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../layouts/Dashboard";
import AppConfig from "../views/AppConfig";

const router = createBrowserRouter(
  [
    {
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <Typography variant="h4">Home</Typography>,
        },
        {
          path: "/support",
          element: <Typography variant="h4">Support</Typography>,
        },
        {
          path: "/about",
          element: <Typography variant="h4">Sobre nós</Typography>,
        },
        {
          path: "/apps",
          element: <Typography variant="h4">apps</Typography>,
        },
        {
          path: "/apps/:id",
          element: <AppConfig />,
        },
        {
          path: "*",
          element: (
            <Typography variant="h4" m="auto">
              404: Página não encontrada
            </Typography>
          ),
        },
      ],
    },
  ],
  {
    basename: "/",
  }
);

export default router;
