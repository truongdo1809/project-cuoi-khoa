import { CiSearch } from "react-icons/ci";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RxTextAlignJustify } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { PiBagSimpleLight } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useSelector } from "react-redux";
import AuthSlice from "../store/AuthSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/ConFig";
import { CiLogin } from "react-icons/ci";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
const Header = () => {
  const [query, changeQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector(AuthSlice.selectSlice);
  return (
    <div className="font-sans">
      <div className="slogan ">
        <p className=" text-sm text-center py-1 bg-[#9C0215] text-white">
          TOMOYO - Đồng hành cùng chất lượng
        </p>
      </div>
      <div className="py-3  px-5 xl:px-[75px]  ">
        <div className="header flex items-center justify-between ">
          <div className="text-3xl lg:hidden">
            <RxTextAlignJustify />
          </div>
          <div className="logo w-3/12 lg:w-1/12 items-center flex justify-center lg:justify-start">
            <Link to={"/"}>
              <img
                src="Home.images/logo.webp"
                alt="logo"
                className=" w-[70px] h-[70px] object-cover  "
              />
            </Link>
          </div>

          <div className="header-search w-6/12 hidden lg:block relative ">
            <input
              required
              value={query}
              onChange={(e) => changeQuery(e.target.value)}
              type="text"
              placeholder="tìm kiếm sản phầm..."
              className="w-full p-[10px] border-solid border-2  border-[#F5F5F5] rounded-md focus:outline-[#D0021B]"
            />
            <button className="text-2xl bg-[#D0021B] px-4 py-[12px] text-white rounded-tr-md rounded-br-md border-none absolute right-0  ">
              <CiSearch
                onClick={() =>
                  navigate(query ? "/product?search=" + query : "")
                }
              />
            </button>
          </div>
          <div className="header-right flex items-center lg:ms-14 ">
            {!user ? (
              <div className=" text-sm hidden lg:block">
                <Link to={"/login"}>Đăng nhập </Link>/
                <Link to={"/register"}>Đăng ký</Link>
              </div>
            ) : (
              <div className="login-register text-3xl pr-2 flex items-center z-[1000]">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<IoPersonCircleSharp />}
                    variant="outline"
                  />
                  <MenuList>
                    {/* <Link to={"cart"}>
                      <MenuItem fontSize={"20px"}>
                        <Box fontSize={"30px"} paddingRight={"10px"}>
                          <TiShoppingCart />
                        </Box>
                        Your cart
                      </MenuItem>
                    </Link> */}
                    <MenuItem fontSize={"20px"} onClick={() => signOut(auth)}>
                      <Box fontSize={"30px"} paddingRight={"10px"}>
                        <CiLogin />
                      </Box>
                      Log Out
                    </MenuItem>
                  </MenuList>
                </Menu>
                <div className="  text-base">{user.displayName}</div>
              </div>
            )}

            <div className="cart flex items-center ps-3 ">
              <Link to={"/cart"}>
                <div className="cart-icon text-3xl relative">
                  <PiBagSimpleLight />
                  <span className=" absolute top-[5px] left-3 text-sm font-bold ">
                    0
                  </span>
                </div>
              </Link>
              <p className="ps-2 text-sm hidden lg:block">Giỏ hàng</p>
            </div>
          </div>
        </div>
      </div>
      <div className="search-mobile w-full p-2 border-t border-[#f5f5f5] relative block lg:hidden">
        <input
          type="text"
          className="w-full border-solid  border-slate-300 border bg-[#f5f5f5] p-1 outline-none focus:outline-none  focus:bg-white"
          placeholder="Tìm kiếm sản phẩm..."
        />
        <div className="text-xl text-[#a39f9f] absolute top-4 right-5 font-bold ">
          <FiSearch />
        </div>
      </div>
    </div>
  );
};

export default Header;
