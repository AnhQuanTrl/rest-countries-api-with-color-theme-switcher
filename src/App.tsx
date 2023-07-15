import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ThemeContextProvider from "./contexts/ThemeContextProvider";
import CountryDetail from "./pages/CountryDetail";
import CountryList from "./pages/CountryList";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <CountryList />,
  },
  {
    path: "/countries/:cca",
    element: <CountryDetail />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}

export default App;
