import staticData from "../../../../staticData";

export default function PTOverview() {
  const { nama_pt, logo_pjg } = staticData;
  return (
    <div className="p-5 mb-20 container mx-auto grid lg:grid-cols-3 grid-cols-1 gap-4">
      <section className="col-span-2">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl lg:text-start text-center">
          {nama_pt}
        </h1>
        <div className="lg:text-xl text-base lg:text-justify text-center">
          Kami adalah Internet Service Provider dan Information Comunication
          Technologi Services
        </div>
      </section>
      <section className="col-span-1 flex items-center justify-center">
        <img
          src={logo_pjg}
          alt="..."
          className="w-[80%] object-cover rounded-xl"
        />
      </section>
    </div>
  );
}
