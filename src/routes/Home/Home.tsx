import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./home.css"
import Card from "./Card";
import NewProduct from "./NewProduct";
import SectionCard from "./SectionCard";
import HotItem from "./HotItem";

const Home = () => {

  return (
    <>
      <div className="slider  font-sans ">
        <Swiper
      
          pagination={{
            clickable:true
          }}
          modules={[Autoplay,Pagination]}
          loop={true}
          autoplay={{
            delay:5000
          }}
     
          speed={1500}
          className="mySwiper z-0"
        >
          <SwiperSlide>
            <img src="Home.images/slideshow_1.webp" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="Home.images/slideshow_2.webp" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="Home.images/slideshow_3.webp" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <Card/>
      <NewProduct/>
      <SectionCard/>
      <HotItem/>
    </>
  );
};

export default Home;
