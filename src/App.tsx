import { RouterProvider } from "react-router-dom";
import { router } from "./routers";

import "./global.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/ThemeProvider";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster richColors />

        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
