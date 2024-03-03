import { CiSearch } from "react-icons/ci";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RxTextAlignJustify } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { PiBagSimpleLight } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthSlice from "../store/AuthSlice";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/ConFig";
import { CiLogin } from "react-icons/ci";
import { MdMarkEmailUnread } from "react-icons/md";
// import { FaShoppingCart } from "react-icons/fa";
// import { FaChevronDown } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import {
  Accordion,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { CartItem } from "../../../routes/cart/Cart";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../fireBaseStore/ConFigStote";

const Header = () => {


  
  
  const [query, changeQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector(AuthSlice.selectSlice);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [users, setUser] = useState<User | null>(null);

  // console.log(users);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //lấy thông tin sản phẩm theo user người dùng
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log("User", user);
      setUser(user);

      if (user) {
        const cartSnapshot = await getDoc(doc(db, "users", user.uid));
        if (cartSnapshot.exists()) {
          const cartData = cartSnapshot.data();
          if (cartData && cartData.items) {
            setCart(cartData.items);
          } else {
            console.log("No items in cart!");
          }
        } else {
          console.log("No such document!");
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
            <RxTextAlignJustify onClick={onOpen} />
          </div>
          {/*  */}

          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />

              <DrawerBody marginTop={"40px"}>
                <ul>
                  <li className=" py-3">
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    <Accordion defaultIndex={[1]} allowMultiple>
                      <AccordionItem>
                        <h2>
                          <AccordionButton
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            className="px-0 py-3"
                            paddingLeft={0}
                            paddingRight={0}
                          >
                            <Link to={"/product"} onClick={onClose}>
                              <Box as="span" flex="1" textAlign="left">
                                Product
                              </Box>
                            </Link>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel paddingLeft={0} paddingRight={0}  onClick={onClose}>
                          <li className=" py-3 border-b-2 border-solid border-[#F5F5F5]" >
                            <Link to={"/product?type=Giày Tây Nam"}>
                              Giày Tây Nam
                            </Link>
                          </li>
                          <li className=" py-3 border-b-2 border-solid border-[#F5F5F5]">
                            <Link to={"/product?type=Giày Tây Nam Không Dây"}>
                              Giày Tây Nam Không Dây
                            </Link>
                          </li>
                          <li className=" py-3 border-b-2 border-solid border-[#F5F5F5]">
                            <Link to={"/product?type=Giày Lười Nam"}>
                              Giày Lười Nam
                            </Link>
                          </li>
                          <li className=" py-3 border-b-2 border-solid border-[#F5F5F5]">
                            <Link to={"/product?type=Giày Búp Bê"}>
                              Giày Búp Bê
                            </Link>
                          </li>
                          <li className=" py-3 border-b-2 border-solid border-[#F5F5F5]">
                            <Link to={"/product?type=Giày Sneaker Siêu Nhẹ"}>
                              Giày Sneaker Siêu Nhẹ
                            </Link>
                          </li>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </li>
                  <li className=" py-3 border-b-2 border-solid border-[#F5F5F5]">
                    <Link to={""}>About</Link>
                  </li>
                  <li className=" py-3 border-b-2 border-solid border-[#F5F5F5]">
                    <Link to={""}></Link>Hệ Thống Cửa Hàng
                  </li>
                  <li className=" py-3 border-b-2 border-solid border-[#F5F5F5]">
                    <Link to={""}></Link>Blog
                  </li>
                </ul>
                <Box paddingTop={"40px"} fontSize={"20px"}>
                  {" "}
                  Bạn Cần Hộ Trợ ?
                </Box>
                <Box display={"flex"} alignItems={"center"} paddingTop={"20px"}>
                  <FaPhoneVolume fontSize={"20px"} color="#9C0215"/> <Box paddingLeft={"15px"}>Liên Hệ: 097 165 4347</Box>
                </Box>
                <Box display={"flex"} alignItems={"center"} paddingTop={"20px"}>
                  <MdMarkEmailUnread fontSize={"25px"} color="#1877F2"/> <Box paddingLeft={"15px"}>Tomoyovn@outlook.com</Box>
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          {/*  */}
          <div className="logo w-3/12 lg:w-1/12 items-center flex justify-center lg:justify-start">
            <Link to={"/"}>
              <img
                src="/Home.images/logo.webp"
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
                    <MenuItem>
                      <Box fontSize={"20px"} className="block sm:hidden">
                        name: {user.displayName}
                      </Box>
                    </MenuItem>

                    <MenuItem
                      as={Link}
                      to={"/"}
                      fontSize={"20px"}
                      onClick={() => signOut(auth)}
                    >
                      <Box fontSize={"30px"}>
                        <CiLogin />
                      </Box>
                      Log Out
                    </MenuItem>
                  </MenuList>
                </Menu>
                <div className="hidden sm:block  text-base">
                  {user.displayName}
                </div>
              </div>
            )}

            <div className="cart flex items-center ps-3 ">
              <Link to={"/cart"}>
                <div className="cart-icon text-3xl relative">
                  <PiBagSimpleLight />
                  <span className=" absolute top-[5px] left-3 text-sm font-bold ">
                    {user ? cart.length : <div>0</div>}
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
          required
          value={query}
          onChange={(e) => changeQuery(e.target.value)}
          type="text"
          className="w-full border-solid  border-slate-300 border bg-[#f5f5f5] p-1 outline-none focus:outline-none  focus:bg-white"
          placeholder="Tìm kiếm sản phẩm..."
        />
        <div className="text-xl text-[#a39f9f] absolute top-4 right-5 font-bold ">
          <FiSearch
            onClick={() => navigate(query ? "/product?search=" + query : "")}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
