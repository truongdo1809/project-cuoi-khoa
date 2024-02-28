import { SlEnvolopeLetter } from "react-icons/sl";

import { FaPhone } from "react-icons/fa6";
import "./Footer.css";
import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
 
} from "@chakra-ui/react";
import { ReactNode } from "react";

import { BiMailSend } from "react-icons/bi";
import { ImLocation } from "react-icons/im";

import { HiPhone } from "react-icons/hi";
import { Link } from "react-router-dom";
const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <div className=" font-sans">
      <div className="top-footer   px-4 sm:px-6 lg:px-12 xl:px-[75px]  py-4 bg-[#F3F3F3]  flex items-center  justify-between ">
        <div className="top-footer-item flex items-center ">
          <div className="text-2xl pr-5">
            <SlEnvolopeLetter />
          </div>
          <p className="text-[14px] font-bold mt-2">Đăng kí nhận tin</p>
        </div>
        <div className="header-search w-full lg:w-6/12 relative  lg:ps-9 pt-6 lg:pt-0 ">
          <input
            type="text"
            placeholder="tìm kiếm sản phầm..."
            className="w-full p-[12px] border-solid border-2  border-[#F5F5F5] rounded-md focus:outline-[#D0021B]"
          />
          <div className="absolute right-0 top-[27px] lg:top-[2px]">
            <button className="footer-button text-sm  px-[13px]  py-[13px] ">
             <span>Đăng Ký</span>
            </button>
          </div>
        </div>
        <div className="phone flex items-center lg:ps-8  pt-6 lg:pt-0 ">
          <div className=" text-xl p-1 text-white bg-black rounded-[50%]">
            <FaPhone />
          </div>
          <div className="phone-text flex">
            <span className="text-[14px] px-5">Hỗ trợ / Mua hàng:</span>
            <p className="text-[#D0021B] text-[15px] "> 097 165 4347</p>
          </div>
        </div>
      </div>
      <Box color={useColorModeValue("gray.700", "gray.200")}>
        <Container as={Stack} maxW={"8xl"} py={10}>
          <SimpleGrid
            templateColumns={{ sm: "1fr 1fr", lg: "2fr 1fr 1fr 2fr" }}
            spacing={8}
          >
            <Stack spacing={6}>
              <ListHeader>Về Tomoyo</ListHeader>
              <Text fontSize={"sm"}>
                CÔNG TY TNHH MTV TOMO VIỆT NAM MST :0316695220 do Sở Kế Hoạch
                Đầu Tư TP.HCM cấp ngày: 26/01/2021
              </Text>
              <Box>
                <img
                  src="Home.images/logo_bct.webp"
                  alt=""
                  className=" cursor-pointer"
                />
              </Box>
              <Stack direction={"row"} spacing={6}>
                <SocialButton label={"Twitter"} href={"#"}>
                  <img src="Home.images/footer_icon_1.webp" alt="" />
                </SocialButton>
                <SocialButton label={"YouTube"} href={"#"}>
                  <img src="Home.images/footer_icon_2.webp" alt="" />
                </SocialButton>
                <SocialButton label={"Instagram"} href={"#"}>
                  <img src="Home.images/footer_icon_3.webp" alt="" />
                </SocialButton>
                <SocialButton label={"Instagram"} href={"#"}>
                  <img src="Home.images/footer_icon_4.webp" alt="" />
                </SocialButton>
                <SocialButton label={"Instagram"} href={"#"}>
                  <img src="Home.images/footer_icon_5.webp" alt="" />
                </SocialButton>
              </Stack>
            </Stack>
            <Stack align={"flex-start"}>
              <div className="ps-[22px]">
                {" "}
                <ListHeader>Thông Tin Liên Hệ</ListHeader>
              </div>
              <Box display={"flex"} alignItems={"center"}>
                <Box paddingRight={"10px"}>
                  <ImLocation />
                </Box>
                391A Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3, Thành phố Hồ
                Chí Minh
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box paddingRight={"10px"}>
                  <HiPhone />
                </Box>
                097 165 4347
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box paddingRight={"10px"}>
                  <SlEnvolopeLetter />
                </Box>
                tomoyovn@outlook.com
              </Box>
            </Stack>
            <div className=" w-52">
              <Stack align={"flex-start"}>
                <ListHeader>Dịch Vụ</ListHeader>
                <Box as="a" href={"#"}>
                  Bảo Hành
                </Box>
                <Box as="a" href={"#"}>
                  Bảo mật
                </Box>
                <Box as="a" href={"#"}>
                  Đổi trả
                </Box>
                <Box as="a" href={"#"}>
                  Hệ Thống Cửa Hàng
                </Box>
              </Stack>
            </div>
            <Stack align={"flex-start"}>
              <ListHeader>Enter Your Email</ListHeader>
              <Stack direction={"row"}>
                <Input
                  placeholder={"Your email address"}
                  bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                  border={0}
                  _focus={{
                    bg: "whiteAlpha.300",
                  }}
                />
                <IconButton
                  bg={useColorModeValue("green.400", "green.800")}
                  color={useColorModeValue("white", "gray.800")}
                  _hover={{
                    bg: "green.600",
                  }}
                  aria-label="Subscribe"
                  icon={<BiMailSend />}
                />
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
      <div className="footer-end text-center py-5 border-t-2  text-sm ">
       <p>Copyright © 2024 <span className="hover:text-[#D0021B]">TOMOYO-Thế giới đồ da thủ công công nghệ Nhật</span>. Powered by Haravan</p>
      </div>
    </div>
  );
};

export default Footer;
