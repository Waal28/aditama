import AdminLayout from "../../../layout/admin";

export default function Transaction() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <h1 className="lg:text-3xl text-base text-gray-700">Transaksi</h1>
        <div className="lg:text-sm text-xs breadcrumbs text-gray-400">
          <ul>
            <li>Admin</li>
            <li>Transaksi</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
