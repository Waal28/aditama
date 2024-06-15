import { BrowserRouter, Route, Routes } from "react-router-dom";
import staticData from "../staticData";
import Home from "./components/pages/Home";
import Billing from "./components/pages/Billing";
import NotFound from "./components/pages/NotFound";
import { AppStateProvider } from "./context/AppStateContext";

function App() {
  const { menu_navbar_admin } = staticData;
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
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
          {routes_portal.map((menu) => (
            <Route
              key={menu.id}
              path={menu.link}
              element={<menu.component />}
            />
          ))}
          {menu_navbar_admin.map((menu) => (
            <Route
              key={menu.id}
              path={menu.link}
              element={<menu.component />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  );
}

export default App;
