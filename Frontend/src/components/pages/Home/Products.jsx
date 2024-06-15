import PropTypes from "prop-types";
import staticData from "../../../../staticData";

const products = [
  {
    id: 1,
    title: "Paket 1",
    speed: "10 Mbps",
    price_before_disc: "225.000",
    price_after_disc: "175.000",
    discount: "-22%",
    feature: [
      "Internet UNLIMITED",
      "Ideal untuk 1 - 3 perangkat",
      "Gratis instalasi",
    ],
  },
  {
    id: 2,
    title: "Paket 2",
    speed: "20 Mbps",
    price_before_disc: "315.000",
    price_after_disc: "220.000",
    discount: "-27%",
    feature: [
      "Internet UNLIMITED",
      "Ideal untuk 1 - 3 perangkat",
      "Gratis instalasi",
    ],
  },
  {
    id: 3,
    title: "Paket 3",
    speed: "50 Mbps",
    price_before_disc: "500.000",
    price_after_disc: "350.000",
    discount: "-30%",
    feature: [
      "Internet UNLIMITED",
      "Ideal untuk 1 - 3 perangkat",
      "Gratis instalasi",
    ],
  },
  {
    id: 4,
    title: "Paket 3",
    speed: "100 Mbps",
    price_before_disc: "999.000",
    price_after_disc: "660.000",
    discount: "-27%",
    feature: [
      "Internet UNLIMITED",
      "Ideal untuk 1 - 3 perangkat",
      "Gratis instalasi",
    ],
  },
];
const icon_feature = [
  "https://api.iconify.design/game-icons:network-bars.svg",
  "https://api.iconify.design/material-symbols:phone-android-outline.svg",
  "https://api.iconify.design/f7:wrench-fill.svg",
];
export default function Products() {
  const { nama_pt } = staticData;
  return (
    <main id="paket-layanan" className="mb-20 scroll-margin-top">
      <section className="pb-12 bg-yellow-300">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <p className="mb-6 text-lg font-bold text-gray-700 lg:text-xl sm:px-16 lg:px-48">
            Harga Paket
          </p>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl :text-white">
            Tentukan Bandwidth Sesuai Dengan Kebutuhanmu.
          </h1>
          <p className="mb-8 text-base font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48">
            Sekarang saatnya menikmati kecepatan baru internet fiber ulta cepat
            dan unlimited dari {nama_pt}
          </p>
        </div>
      </section>
      <div className="relative -mt-24 container mx-auto lg:p-5 p-12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-11">
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

function CardProduct({ product }) {
  const {
    title,
    speed,
    price_after_disc,
    price_before_disc,
    discount,
    feature,
  } = product;
  const style = {
    yellow_border: {
      boxShadow: "4px 4px 1px rgb(234 225 83",
    },
    black_border: {
      boxShadow: "4px 4px 1px rgb(0, 0, 0)",
    },
  };
  const { noHp } = staticData.kontak;
  const message = "Halo, saya ingin bertanya tentang produk Anda.";

  const handleLangganan = () => {
    const url = `https://wa.me/${noHp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  const handleHubungi = () => {
    const url = `tel:${noHp}`;
    window.open(url, "_blank");
  };
  return (
    <div className="relative">
      <span className="absolute -z-10  w-full h-full inset-1 bg-yellow-300 rounded-xl" />
      <button
        style={style.black_border}
        className="absolute py-1 z-10 px-3 -left-8 -top-2 -rotate-[10deg] lg:text-lg text-base bg-yellow-300 text-black font-bold"
      >
        {title}
      </button>
      <div
        style={style.yellow_border}
        className="p-8 border border-gray-200 bg-white rounded-xl z-20"
      >
        <h3 className="lg:text-2xl text-xl font-bold">{speed}</h3>
        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex items-center mb-4 text-gray-400">
          <p className="lg:text-xl text-base font-medium line-through me-5">
            Rp. {price_before_disc}
          </p>
          <p className="text-red-500 bg-red-200 p-2 lg:text-sm text-xs rounded-full w-fit h-full">
            {discount}
          </p>
        </div>
        <div className="flex items-end mb-3">
          <h3 className="lg:text-2xl text-xl font-bold me-2">
            Rp. {price_after_disc}
          </h3>
          <span className="lg:text-sm text-xs text-gray-400">/ bulan</span>
        </div>
        <p className="lg:text-sm text-xs mb-8 text-gray-400">
          Harga belum termasuk PPN 11%
        </p>
        <div className="flex flex-col gap-2 mb-8">
          <button
            className="btn lg:btn-md btn-xs border-none bg-secondary text-black hover:bg-yellow-400"
            onClick={handleLangganan}
          >
            Langganan Sekarang
          </button>
          <button
            className="btn lg:btn-md btn-xs btn-ghost text-black hover:bg-yellow-400"
            style={{ boxShadow: "0px 2px 2px rgb(234 225 83" }}
            onClick={handleHubungi}
          >
            Hubungi
          </button>
        </div>
        <h4 className="lg:text-lg text-sm font-semibold">Fitur</h4>
        <ul>
          {feature.map((feature, i) => (
            <li key={i} className="flex my-1 lg:text-sm text-xs text-gray-400">
              <img
                src={icon_feature[i]}
                alt="..."
                className="lg:w-5 w-4 me-2"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
CardProduct.propTypes = {
  product: PropTypes.object,
};
