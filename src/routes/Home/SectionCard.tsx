const SectionCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-1 font-sans gap-1 pt-8">
      <div className="section-card-1 relative  overflow-hidden">
        <img src="Home.images/sectionCard-images-1.webp" alt="" />
        <div className="card-info absolute  left-14 md:left-5 lg:left-14 bottom-5 flex flex-col text-left   ">
          <p className="  text-lg text-white">sale 30%</p>
          <span className="text-white text-2xl my-5 font-bold">
            Giày Búp Bê
          </span>
          <button className="card-button py-2">
            <span>MUA NGAY</span>
          </button>
        </div>
      </div>
      <div className="section-card-1 relative  overflow-hidden">
        <img src="Home.images/sectionCard-images-2.webp" alt="" />
        <div className="card-info absolute  left-14 md:left-5 lg:left-14 bottom-5 flex flex-col text-left   ">
          <p className="  text-lg text-white">Lịch Lãm</p>
          <span className="text-white text-2xl my-5 font-bold">
            Thời Trang Công Sở
          </span>
          <button className="card-button py-2 w-[140px]">
            <span>MUA NGAY</span>
          </button>
        </div>
      </div>
      <div className="section-card-1 relative  overflow-hidden">
        <img src="Home.images/sectionCard-images-3.webp" alt="" />
        <div className="card-info absolute left-14 md:left-5 lg:left-14 bottom-5 flex flex-col text-left   ">
          <p className="  text-lg text-white">Phong Cách </p>
          <span className="text-white text-2xl my-5 font-bold">
            Sneaker Cá Tính
          </span>
          <button className="card-button py-2 w-[140px]">
            <span>MUA NGAY</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
