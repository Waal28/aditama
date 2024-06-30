import { Link, useNavigate } from "react-router-dom";
import staticData from "../../../../staticData";
import { useAppState } from "../../../context/AppStateContext";
import profileImage from "../../../../public/profile.png";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { user } = useAppState();
  const { logo_pjg } = staticData;
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };
  return (
    <div className="navbar lg: bg-header_footer border-b-4 border-secondary text-gray-700">
      <div className="flex-none">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-square btn-ghost drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <Link to="/admin" className="btn btn-ghost text-xl lg:mx-0 mx-auto">
          <img src={logo_pjg} alt="" className="h-10 rounded-2xl" />
        </Link>
      </div>
      <div className="flex-none lg:gap-4 gap-1 lg:me-3">
        <div className="font-semibold lg:block hidden text-center">
          {user.nama}
          <div className="text-xs capitalize">({user.tipeAkses})</div>
        </div>
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:btn-disabled btn-circle avatar bg-yellow-200"
          >
            <div className="w-10 rounded-full">
              <img alt={user.nama} src={profileImage} />
            </div>
          </button>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-0 shadow menu menu-sm dropdown-content bg-gray-800 text-white text-sm rounded-lg min-w-40 w-max"
          >
            <li className="border-b border-gray-300 bg-gray-700 px-3 py-2 rounded-t-lg text-center">
              {user.nama}
              <div className="btn-disabled text-xs capitalize mx-auto">
                ({user.tipeAkses})
              </div>
            </li>
            <li className="hover:bg-secondary hover:text-black focus:bg-secondary focus:text-black p-2 rounded-b-lg">
              <button onClick={handleLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4"
                  viewBox="0 0 16 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 9V7H8V5h4V3l4 3l-4 3zm-2 3H6V3L2 1h8v3h1V1c0-.55-.45-1-1-1H1C.45 0 0 .45 0 1v11.38c0 .39.22.73.55.91L6 16.01V13h4c.55 0 1-.45 1-1V8h-1v4z"
                    fill="currentColor"
                  />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div
          className="lg:flex hidden tooltip tooltip-bottom"
          data-tip="Logout"
        >
          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-circle bg-yellow-200"
          >
            <img
              src="https://api.iconify.design/octicon:sign-out.svg"
              alt="..."
              className="w-6 -me-2 -mb-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
