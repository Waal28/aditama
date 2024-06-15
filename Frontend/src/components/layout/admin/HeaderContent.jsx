import PropTypes from "prop-types";

export default function HeaderContent({ title }) {
  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="lg:text-3xl text-xl text-gray-700">{title}</h1>
      <div className="lg:text-sm text-xs breadcrumbs text-gray-400">
        <ul>
          <li>Admin</li>
          <li>{title}</li>
        </ul>
      </div>
    </div>
  );
}
HeaderContent.propTypes = {
  title: PropTypes.string,
};
