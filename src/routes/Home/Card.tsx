import "./home.css";

import 'swiper/css';
import 'swiper/css/pagination';
const Card = () => {
  return (
    <div className=" font-sans">
      <div className="product-specail  grid  grid-cols-3 p-1 gap-1 ">
        <div className="card relative ">
          <img src="Home.images/card-img1.webp" alt="" />
          <div className=" card-bottom absolute bottom-0 w-full h-24  "></div>
          <div className="card-text absolute left-5 bottom-4 text-white">
            <p className=" text-base mb-3 hidden sm:block">Giày Nam</p>
            <button className="card-button  ">
              <span>Xem Ngay</span>
            </button>
          </div>
        </div>

        <div className="card relative ">
          <img src="Home.images/card-img2.webp" alt="" />
          <div className=" card-bottom absolute bottom-0 w-full h-24 "></div>
          <div className="card-text absolute  left-5 bottom-4 text-white">
            <p className=" text-base mb-3 hidden sm:block">Giày Nữ</p>
            <button className="card-button  ">
              <span>Xem Ngay</span>
            </button>
          </div>
        </div>

        <div className="card relative ">
          <img src="Home.images/card-img3.webp" alt="" />
          <div className=" card-bottom absolute bottom-0 w-full h-24 "></div>
          <div className="card-text absolute left-5 bottom-4 text-white">
            <p className=" text-base mb-3 hidden sm:block">Dép & Sandal</p>
            <button className="card-button  ">
              <span>Xem Ngay</span>
            </button>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Card;
