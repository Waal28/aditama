import { BrowserRouter, Route, Routes } from "react-router-dom";
import { defaultMenusAdmin, menusAdmin } from "../constants";
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
        {defaultMenusAdmin.map((menu) => (
          <Route key={menu.id} path={menu.link} element={<menu.component />} />
        ))}
        {menusAdmin[user.tipeAkses] &&
          menusAdmin[user.tipeAkses].map((menu) => (
            <Route
              key={menu.id}
              path={menu.link}
              element={
                <menu.component
                  canCreate={menu.can.create}
                  canEdit={menu.can.edit}
                  canDelete={menu.can.delete}
                />
              }
            />
          ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
