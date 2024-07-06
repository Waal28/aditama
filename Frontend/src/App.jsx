import { BrowserRouter, Route, Routes } from "react-router-dom";
import { menusAdmin } from "../constants";
import Home from "./components/pages/Home";
import Billing from "./components/pages/Billing";
import NotFound from "./components/pages/NotFound";
import { useAppState } from "./context/AppStateContext";

function App() {
  const { user } = useAppState();
  const routesPortal = [
    {
      id: 1,
      name: "Beranda",
      link: "/",
      component: Home,
    },
    {
      id: 2,
      name: "Informasi Tagihan",
      link: "/tagihan",
      component: Billing,
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {routesPortal.map((menu) => (
          <Route key={menu.id} path={menu.link} element={<menu.component />} />
        ))}
        {menusAdmin.map(
          (menu) =>
            menu.showFeatureFor.includes(user.tipeAkses) && (
              <Route
                key={menu.id}
                path={menu.link}
                element={<menu.component />}
              />
            )
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
