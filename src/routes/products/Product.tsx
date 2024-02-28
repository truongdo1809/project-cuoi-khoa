import { Link, useSearchParams } from "react-router-dom";
import { Select, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ProductItem } from "../Home/NewProduct";
import { BsCart2 } from "react-icons/bs";
import { useState } from "react";

const Product = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [value, setValue] = useState<string>("");
  const query = searchParams.get("search");

  const { data, isLoading } = useQuery({
    queryKey: ["product", type, query, value],
    queryFn: () => {
      const baseUrl = "https://api-tomoyoo.vercel.app/products";
      const queryParams = [];
    
      if (query) {
        queryParams.push(`title_like=${query}`);
      }
      if (type) {
        queryParams.push(`type=${type}`);
      }
      if (value) {
        queryParams.push(`_sort=priceSale&_order=${value}`);
      }
    
      const url = `${baseUrl}${queryParams.length > 0 ? `?${queryParams.join('&')}` : ''}`;
    
      return fetch(url).then((res) => res.json());
    },
  });
  

  


  const formatPrice = (price: number): string => {
    return price
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "");
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }
  return (
    <div className=" font-sans">
      <div className="navbar py-3 bg-[#F5F5F5]  px-[75px] flex items-center text-[13px]">
        <span className="hover:text-[#940141]">
          <Link to={"/"}>Trang chủ</Link>
        </span>
        <p className=" px-3">/</p>
        <span className="hover:text-[#940141]">
          <Link to={"/product"}>Product</Link>
        </span>
      </div>
      <div className="product xl:px-[75px] px-[10px] flex">
        {/* <div className="product-right w-3/12 hidden lg:block"></div> */}
        <div className="product-left ">
          <div className="product-navbar flex items-center justify-between py-9">
            <div className="flex">
              <h1>Bạn đang xem:</h1>
              <strong>{type || query || "Sản Phẩm"}</strong>
            </div>
            <div className="filter">
              <Select onChange={(e) => setValue(e.target.value)} value={value}>
                <option value="">Filter</option>
                <option value="desc">Từ cao đến thấp</option>
                <option value="asc">Từ thấp đến cao</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10 gap-5">
            {data.map((product: ProductItem) => (
              <div className="product-card w-full rounded-lg" key={product.id}>
                <Link to={`/detail/${product.id}`}>
                  <img
                    src={product.img}
                    className="default-img w-full"
                    alt=""
                  />
                  <img
                    src={product.imgHover}
                    className="hidden hover-img w-full"
                    alt=""
                  />
                </Link>

                <div className="product-info p-2 relative">
                  <Link to={`/detail/${product.id}`}>
                    <h2 className="w-full overflow-hidden pt-5 text-[14px] pb-4  font-medium whitespace-nowrap product-title">
                      {product.title}
                    </h2>
                  </Link>

                  <div className="product-price absolute left-4   bottom-20 sm:static">
                    <span className="price-sale sm:text-[#FF7F7F] mr-3 sm:mr-5 sm:text-base text-[10px] p-1 text-white bg-black sm:bg-inherit">
                      {formatPrice(product.priceSale)}đ
                    </span>
                    <span className="price sm:text-[#939393] relative sm:text-base text-[10px] text-black">
                      {formatPrice(product.price)}đ
                      <p className="w-12 md:w-[75px] bg-[#939393] h-[1px] absolute left-0 bottom-[5px] sm:bottom-[9px]"></p>
                    </span>
                  </div>
                  <button className="text-2xl absolute right-1 bottom-2 bg-[#eae7e7] p-1  rounded-3xl hover:bg-[#FF7F7F] hover:text-white hidden sm:block ">
                    <Link to={`/detail/${product.id}`}>
                      <BsCart2 />
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
