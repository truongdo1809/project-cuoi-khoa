import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import "./Navigation.css";
const Navigation = () => {
  return (
    <>
      <div className="menu hidden lg:block font-sans z-[1000] ">
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
                <Link to={"/product?type=Giày Tây Nam Không Dây"}>Giày Tây Nam Không Dây</Link>
              </li>
              <li>
                <Link to={"/product?type=Giày Lười Nam"}>Giày Lười Nam</Link>
              </li>
              <li>
                <Link to={"/product?type=Giày Búp Bê"}>Giày Búp Bê</Link>
              </li>
              <li>
                <Link to={"/product?type=Giày Sneaker Siêu Nhẹ"}>Giày Sneaker Siêu Nhẹ</Link>
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
    </>
  );
};

export default Navigation;
