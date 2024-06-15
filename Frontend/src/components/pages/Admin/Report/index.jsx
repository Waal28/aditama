import AdminLayout from "../../../layout/admin";

export default function Report() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <h1 className="lg:text-3xl text-base text-gray-700">Laporan</h1>
        <div className="lg:text-sm text-xs breadcrumbs text-gray-400">
          <ul>
            <li>Admin</li>
            <li>Laporan</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
