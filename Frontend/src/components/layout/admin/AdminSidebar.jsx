import PropTypes from "prop-types";
import staticData from "../../../../staticData";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar({ children }) {
  const { menu_navbar_admin } = staticData;
  const location = useLocation();
  const currentPath = location.pathname + location.hash;
  return (
    <div className="drawer lg:drawer-open h-full pb-0 mb-0">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-white p-5">{children}</div>
      <div className="drawer-side h-full z-20">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu lg:w-64 min-h-full lg:pt-3 pt-10 px-3 bg-header_footer text-gray-700">
          {menu_navbar_admin.map((item, index) => {
            if (item.name !== "Login")
              return (
                <li key={index} className="mb-1">
                  <Link
                    to={item.link}
                    className={getClassName(item.link === currentPath)}
                  >
                    <img src={item.icon} alt="..." className="w-6 h-6 me-2" />
                    {item.name}
                  </Link>
                </li>
              );
          })}
        </ul>
      </div>
    </div>
  );
}
function getClassName(isCurrentPath) {
  const baseClass =
    "btn btn-ghost justify-start mx-0.5 hover:bg-secondary hover:text-black focus:bg-secondary focus:text-black";
  const activeClass = "bg-secondary text-black";

  return isCurrentPath ? `${baseClass} ${activeClass}` : baseClass;
}
AdminSidebar.propTypes = {
  children: PropTypes.node,
};
