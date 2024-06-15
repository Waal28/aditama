export default function ServiceOffered() {
  const styles = {
    cardShadow: {
      boxShadow:
        "rgba(240, 211, 46, 0.4) -5px 5px, rgba(240, 211, 46, 0.3) -10px 10px, rgba(240, 211, 170, 0.2) -15px 15px, rgba(240, 211, 170, 0.1) -20px 20px, rgba(240, 211, 170, 0.05) -25px 25px",
    },
  };
  const service = [
    {
      title: "Layanan Internet",
      icon: "https://api.iconify.design/material-symbols:speed-outline.svg",
      description:
        "Kami menyediakan layanan internet dedicated, membuatnya nyaman untuk berselancar di dunia maya.",
    },
    {
      title: "Fiber Optic & Wireless",
      icon: "https://api.iconify.design/material-symbols:wifi-rounded.svg",
      description:
        "Kami siap menjadi jaringan bisnis anda dan solusi infrastruktur, dengan solusi teknologi terkini.",
    },
  ];
  return (
    <main className="mb-20 p-5">
      <h1 className="mb-10 text-3xl tracking-tight font-bold text-gray-900 md:text-5xl lg:text-6xl text-center">
        Layanan Yang Ditawarkan
      </h1>
      <div className="container mx-auto px-5 grid lg:grid-cols-2 gap-10">
        {service.map((item, i) => (
          <div
            key={i}
            className="card mb-10 border border-gray-200"
            style={styles.cardShadow}
          >
            <div className="card-body">
              <div className="grid lg:grid-cols-6 grid-cols-1 lg:gap-5">
                <div className="flex items-center justify-center lg:w-full w-14 mx-auto">
                  <img src={item.icon} alt="..." className="w-full" />
                </div>
                <div className="col-span-5">
                  <h2 className="card-title lg:my-0 my-2 lg:justify-start justify-center">
                    {item.title}
                  </h2>
                  <p className="lg:mt-2 mt-0 lg:text-base text-sm lg:text-justify text-center">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
