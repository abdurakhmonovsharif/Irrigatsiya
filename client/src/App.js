import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Comments from "./Components/Comments/Comments";
import Detailed from "./Components/Detailed/Detailed";
import HomeComponents from "./Components/HomeComponents/HomeComponents";
import React, { Suspense, useContext, useEffect, useState } from "react";
import Loading from "./Components/Loading/Loading";
import NotFound from "./NotFound";
import { ToastContainer, toast } from "react-toastify";
import { StatesContext } from "./context/GlobalContext";
import { HelmetProvider } from "react-helmet-async";
const Home = React.lazy(() => import("./Components/Home/Home"));
function App() {
  const { lang } = useContext(StatesContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: <HomeComponents />,
        },
        {
          path: "/announcement/comment/:id",
          element: <Comments />,
        },
        {
          path: "/:id",
          element: <Detailed />,
        },
        {
          path: "/:id/all",
          element: <Detailed />,
        },
      ],
    },

    {
      path: "/not-found",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  const networkError = () =>
    setTimeout(() => {
      toast.error(
        lang === "uz"
          ? "XATOLIK INTERNET UZILDI"
          : lang === "en"
          ? "ERR INTERNET DISCONNECTED"
          : lang === "ru" && "ОШИБКА ИНТЕРНЕТ ОТКЛЮЧЕН",
        {
          className: "toast-error-container toast-error-container-after ",
        }
      );
    }, 2000);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  !isOnline && networkError();
  return (
    <>
      <ToastContainer theme="light" autoClose={5000} rtl={false} />
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  );
}

export default App;
