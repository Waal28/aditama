import Slider from "react-slick";
import PropTypes from "prop-types";
import constants from "../../../../constants";

export default function CarouselMitra() {
  const { logo_mitra } = constants;

  const settings = {
    //dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 2 detik
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          //dots: true,
        },
      },
    ],
  };

  return (
    <div className="bg-yellow-300 mb-20 px-5 py-16 flex flex-col items-center justify-center">
      <h1 className="lg:mb-10 md:mb-10 mb-5 text-3xl tracking-tight font-bold text-gray-900 md:text-5xl lg:text-6xl text-center">
        Bekerja Sama Dengan Mitra
      </h1>
      <div className="w-full">
        <Slider {...settings}>
          {logo_mitra.map((logo, i) => (
            <div key={i} className="p-5">
              <div className="bg-yellow-200 shadow-md rounded-2xl flex items-center justify-center mx-auto">
                <img
                  src={logo}
                  className="rounded-box lg:w-48 w-44"
                  alt={`Logo ${i}`}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        width: "32px",
        height: "32px",
        borderRadius: "100%",
        backgroundColor: "darkGray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        paddingTop: "2.8px",
        left: "-20px",
      }}
      onClick={onClick}
    />
  );
};
PrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        width: "32px",
        height: "32px",
        borderRadius: "100%",
        backgroundColor: "darkGray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        paddingTop: "2.8px",
        right: "-20px",
      }}
      onClick={onClick}
    />
  );
};
NextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
