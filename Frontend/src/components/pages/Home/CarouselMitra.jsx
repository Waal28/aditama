export default function CarouselMitra() {
  const logo_mitra = [
    "https://api.iconify.design/ic:twotone-local-fire-department.svg",
    "https://api.iconify.design/mdi:skull-scan.svg",
    "https://api.iconify.design/game-icons:pistol-gun.svg",
    "https://api.iconify.design/fluent-emoji-high-contrast:clown-face.svg",
    "https://api.iconify.design/solar:waterdrops-line-duotone.svg",
    "https://api.iconify.design/fluent-emoji-high-contrast:dragon.svg",
  ];
  return (
    <div className="bg-yellow-300 mb-20 px-5 py-16 flex flex-col items-center justify-center">
      <h1 className="mb-5 text-3xl tracking-tight font-bold text-gray-900 md:text-5xl lg:text-6xl text-center">
        Bekerja Sama Dengan Mitra
      </h1>
      <div className="carousel carousel-center p-4 space-x-4 bg-yellow-300">
        {logo_mitra.map((logo, i) => (
          <div key={i} className="carousel-item bg-white rounded-md">
            <img src={logo} className="rounded-box lg:w-48 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
