import PropTypes from "prop-types";
import PortalNavbar from "./PortalNavbar";
import PortalFooter from "./PortalFooter";

export default function PortalLayout({ children }) {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col justify-between items-center">
      <PortalNavbar />
      <main className="bg-white text-gray-700 min-h-96 w-full">{children}</main>
      <PortalFooter />
    </div>
  );
}
PortalLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
