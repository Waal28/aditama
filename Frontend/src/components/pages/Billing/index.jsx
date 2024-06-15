import PortalLayout from "../../layout/portal";
import BillingTable from "./BillingTable";

export default function Billing() {
  return (
    <PortalLayout>
      <section className="bg-yellow-300 px-5 lg:py-14 py-10 mb-5">
        <div className="container mx-auto max-w-screen-xl lg:text-start text-center">
          <p className="lg:mb-5 mb-3 text-lg font-bold text-gray-700 lg:text-xl">
            Informasi Tagihan
          </p>
          <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl">
            Cek Informasi Tagihan Anda
          </h1>
          <p className="font-normal text-gray-700 lg:text-xl text-sm">
            Pada halaman ini, akan membantu anda untuk melihat informasi tagihan
            terkini, dengan menginputkan sesuai konfigurasi anda.
          </p>
        </div>
      </section>
      <BillingTable />
    </PortalLayout>
  );
}
