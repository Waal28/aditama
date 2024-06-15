import PropTypes from "prop-types";
import staticData from "../../../../staticData";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PortalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { menu_navbar_portal, logo_pjg, logo_blt } = staticData;
  const location = useLocation();
  const currentPath = location.pathname + location.hash;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <main className="w-full bg-header_footer text-gray-700 font-medium border-b-4 border-secondary sticky top-0 z-50 shadow-md">
      <div className="navbar px-5 container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              onClick={toggleMenu}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 text-white rounded-box w-52"
              >
                <MenuMobile
                  menus={menu_navbar_portal}
                  currentPath={currentPath}
                  toggleMenu={toggleMenu}
                />
              </ul>
            )}
          </div>
          <Link to="/">
            <img
              src={logo_pjg}
              alt="logo"
              className="h-10 rounded-2xl hidden lg:flex"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <MenuDesktop menus={menu_navbar_portal} currentPath={currentPath} />
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/">
            <img
              src={logo_blt}
              alt="logo"
              className="h-14 flex lg:hidden shadow-lg rounded-xl"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}

function getClassName(isCurrentPath) {
  const baseClass =
    "m-0.5 hover:bg-secondary hover:text-black focus:bg-secondary focus:text-black";
  const activeClass = "bg-secondary text-black";

  return isCurrentPath ? `${baseClass} ${activeClass}` : baseClass;
}

function MenuMobile({ menus, currentPath, toggleMenu }) {
  return menus.map((menu) =>
    menu.children ? (
      <li key={menu.id}>
        <span>{menu.name}</span>
        <ul className="p-2">
          <MenuDesktop menus={menu.children} />
        </ul>
      </li>
    ) : (
      <li key={menu.id}>
        <Link
          to={menu.link}
          onClick={toggleMenu}
          className={getClassName(
            (menu.link === "/#beranda" && currentPath === "/") ||
              menu.link === currentPath
          )}
        >
          {menu.name}
        </Link>
      </li>
    )
  );
}
MenuDesktop.propTypes = {
  menus: PropTypes.array,
  currentPath: PropTypes.string,
  toggleMenu: PropTypes.func,
};

function MenuDesktop({ menus, currentPath }) {
  return menus.map((menu) =>
    menu.children ? (
      <li key={menu.id}>
        <details>
          <summary>{menu.name}</summary>
          <ul className="p-2">
            <MenuMobile menus={menu.children} />
          </ul>
        </details>
      </li>
    ) : (
      <li key={menu.id}>
        <Link
          to={menu.link}
          className={getClassName(
            (menu.link === "/#beranda" && currentPath === "/") ||
              menu.link === currentPath
          )}
        >
          {menu.name}
        </Link>
      </li>
    )
  );
}
MenuMobile.propTypes = {
  menus: PropTypes.array,
  currentPath: PropTypes.string,
};
