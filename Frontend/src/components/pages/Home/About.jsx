import constants from "../../../../constants";

export default function About() {
  const { nama_pt, gambarDiTentangKami } = constants;
  const styles = {
    cardShadow: {
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 2px inset, rgb(255, 230, 0) 10px -10px 0px -3px, rgb(255, 255, 255) 10px -10px, rgb(255, 230, 0) 20px -20px 0px -3px, rgb(255, 255, 255) 20px -20px, rgb(255, 230, 0) 30px -30px 0px -3px, rgb(255, 255, 255) 30px -30px",
    },
  };
  const visiMisi = [
    {
      title: "Visi",
      description: ["Menjadi penyedia layanan internet cepat di Indonesia"],
    },
    {
      title: "Misi",
      description: [
        "Komitmen pelayanan dan solusi terbaik kepada pelanggan dan mitra kami.",
        "Meratakan jaringan koneksi internet ke pelosok daerah.",
        "Perkembangan up to date teknologi kekinian untuk era digital sebagai solusi terbaik pelanggan dan mitra kami.",
      ],
    },
  ];
  return (
    <main id="tentang-kami" className="scroll-margin-top">
      <div className="container mx-auto p-5 lg:grid flex flex-col-reverse lg:grid-cols-2 grid-cols-1 gap-4 mb-20">
        <section className="col-span-1 flex items-center justify-center">
          <img
            src={gambarDiTentangKami}
            alt="..."
            className="w-[80%] object-cover"
          />
        </section>
        <section className="col-span-1">
          <p className="mb-6 text-lg font-bold text-gray-500 lg:text-xl lg:text-start text-center ">
            Tentang Kami
          </p>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl lg:text-start text-center ">
            {nama_pt}
          </h1>

          <div className="lg:text-xl text-base lg:text-justify text-center">
            <span className="uppercase">{nama_pt}</span> merupakan sebuah
            perusahaan yang berdiri pada tahun 2021 di Pekanbaru. Bermula dari
            keinginan para pwndiri yang lama telah berkecimpung dibidanng IT,
            Network, IOT dan peluang perkembangan kota Pekanbaru dan Riau akan
            kebutuhan internet yang kian hari kian pesat termasuk perkembangan
            teknologi IT dan Jaringan.
          </div>
        </section>
      </div>
      <div className="container mx-auto p-5 mb-5">
        <h1 className="mb-5 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl text-center ">
          Maksud & Tujuan Perusahaan
        </h1>
        <div className="lg:text-xl text-base text-center">
          <span className="uppercase">{nama_pt}</span> diharapkan akan mampu
          menjadikan Perusahaan yang selalu mengusung nilai manfaat bagi para
          praktisi IT, pengguna internet dan teknologi khususnya di Pekanbaru.
          Dan akan mengembangkan keberbagai wilayah di indonesia dengan visi dan
          misi menjadi wilayah usaha terbaik dengan pelanggannya.
        </div>
      </div>
      <div className="grid grid-cols-1 gap-14 lg:px-60 ps-10 pe-20 pt-20 pb-14 bg-yellow-300">
        {visiMisi.map((item, i) => (
          <div key={i} className="card bg-white" style={styles.cardShadow}>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <ul className={item.description.length > 1 ? "list-decimal" : ""}>
                {item.description.map((desc, i) => (
                  <li key={i} className="text-justify">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
