import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import "./Navigation.css";
import { FaCircleChevronUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 500) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scrolling
    });
  };
  return (
    <>
      <div
        className={`menu ${
          isScrolled ? "fixed top-0" : ""
        } hidden lg:block font-sans z-[1000]  bg-white w-full`}
      >
        <ul className="menu-item flex justify-center items-center gap-2">
          <li className="py-3 px-4 ">
            <p>
              <Link to={"/"}>Trang chủ</Link>
            </p>
          </li>
          <li className="py-3 px-4 relative menu-item-1">
            <p>
              <Link to={"/product"}>Sản phẩm</Link>
              <span className="text-xs absolute right-0 top-5 menu-icon-2">
                <FaChevronDown />
              </span>
              <span className="text-xs absolute right-0 top-5 menu-icon hidden">
                <FaChevronUp />
              </span>
            </p>
            <ul className="sub-menu absolute hidden z-[1000] bg-white w-52 left-[18px]">
              <li>
                <Link to={"/product?type=Giày Tây Nam"}>Giày Tây Nam</Link>
              </li>
              <li>
                <Link to={"/product?type=Giày Tây Nam Không Dây"}>
                  Giày Tây Nam Không Dây
                </Link>
              </li>
              <li>
                <Link to={"/product?type=Giày Lười Nam"}>Giày Lười Nam</Link>
              </li>
              <li>
                <Link to={"/product?type=Giày Búp Bê"}>Giày Búp Bê</Link>
              </li>
              <li>
                <Link to={"/product?type=Giày Sneaker Siêu Nhẹ"}>
                  Giày Sneaker Siêu Nhẹ
                </Link>
              </li>
            </ul>
          </li>

          <li className="py-3 px-4 relative ">
            <p>
              <Link to={""}>About</Link>
            </p>
          </li>

          <li className="py-3 px-4">
            <p>
              <Link to={""}>Hệ Thống Cửa Hàng</Link>
            </p>
          </li>
          <li className="py-3 px-4">
            <p>
              <Link to={""}>Blog</Link>
            </p>
          </li>
        </ul>
      </div>
      {isScrolled ? (
        <div className=" fixed right-[27px] bottom-[130px] text-6xl z-[10000]  text-[#D0021B] cursor-pointer">
          <FaCircleChevronUp onClick={scrollToTop}/>
        </div>
      ) : (
        <div></div>
      )}
      {isScrolled ? (
        <div className=" cursor-pointer  fixed right-5 bottom-8 text-5xl text-white bg-blue-600 p-3 z-[1000] rounded-full">
          <FaFacebookMessenger />
        </div>
      ) : (
        <div></div>
      )}{" "}
    </>
  );
};

export default Navigation;
