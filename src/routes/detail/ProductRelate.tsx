import { useQuery } from "@tanstack/react-query";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
export type ProductItem = {
  id: number;
  title: string;
  type: string;
  priceSale: number;
  price: number;
  img: string;
  imgHover: string;
  description1: string;
  description2: string;
};
const ProductRelate = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return fetch("https://api-tomoyoo.vercel.app/products").then((res) =>
        res.json()
      );
    },
  });
  const formatPrice = (price: number): string => {
    return price
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "");
  };

  const getRandomProducts = () => {
    if (data) {
      const randomProducts = [...data];
      for (let i = randomProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomProducts[i], randomProducts[j]] = [
          randomProducts[j],
          randomProducts[i],
        ];
      }
      return randomProducts.slice(10, 15);
    }
    return [];
  }
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>{JSON.stringify(error)} </div>;
  }

  const randomProducts = getRandomProducts();

  return (
    <div className="font-sans  pb-20">
      <div className="heading text-center py-12">
        <h1 className="text-4xl font-medium">Sản Phẩm Liên Quan</h1>
      </div>

      <div className="new-product grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:px-16 px-8  gap-5">
        {randomProducts.map((product: ProductItem) => (
          <div className="product-card w-full rounded-lg" key={product.id}>
            <Link to={`/detail/${product.id}`}>
              <img src={product.img} className="default-img w-full" alt="" />
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
                  <p className="w-12 md:w-[76px] bg-[#939393] h-[1px] absolute left-0 bottom-[5px] sm:bottom-[9px]"></p>
                </span>
              </div>
              <button className="text-2xl absolute right-4 bottom-2 bg-[#eae7e7] p-1  rounded-3xl hover:bg-[#FF7F7F] hover:text-white hidden sm:block ">
                <Link to={`/detail/${product.id}`}>
                  <BsCart2 />
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRelate;
