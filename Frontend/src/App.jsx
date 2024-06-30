import { BrowserRouter, Route, Routes } from "react-router-dom";
import staticData from "../staticData";
import Home from "./components/pages/Home";
import Billing from "./components/pages/Billing";
import NotFound from "./components/pages/NotFound";
import { useAppState } from "./context/AppStateContext";

function App() {
  const { menu_navbar_admin } = staticData;
  const { user } = useAppState();
  const routes_portal = [
    {
      id: 1,
      name: "Beranda",
      link: "/",
      component: Home,
    },
    {
      id: 3,
      name: "Informasi Tagihan",
      link: "/tagihan",
      component: Billing,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes_portal.map((menu) => (
          <Route key={menu.id} path={menu.link} element={<menu.component />} />
        ))}
        {menu_navbar_admin.map(
          (menu) =>
            menu.showMenuFor.includes(user.tipeAkses) && (
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
