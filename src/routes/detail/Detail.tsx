import { useQuery } from "@tanstack/react-query";
import "./detail.css";
import { Link, useParams } from "react-router-dom";
import ProductRelate from "./ProductRelate";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../assets/features/fireBaseStore/ConFigStote";

const Detail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return fetch("https://api-tomoyoo.vercel.app/products/" + id).then(
        (res) => res.json()
      );
    },
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div className="text-center my-auto">{JSON.stringify(error)}</div>;
  }

  const formatPrice = (price: number): string => {
    return price
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "");
  };
  return (
    <div className="detail">
      <div className="navbar-detail py-3 bg-[#F5F5F5]  px-[75px] flex items-center text-[13px]">
        <span className="hover:text-[#940141]">
          <Link to={"/"}>Trang chủ</Link>
        </span>
        <p className=" px-3">/</p>
        <span className="hover:text-[#940141]">
          <Link to={"/product"}>{data.type}</Link>
        </span>
        <p className=" px-3">/</p>
        <span className="hover:text-[#940141]">{data.title}</span>
      </div>
      <div className="detail-card flex px-[75px] font-sans pt-8 pb-12">
        <div className="detail-left w-5/12 px-[15px]"></div>
        <div className="detail-right w-7/12 px-[15px]">
          <h1 className=" pb-3  text-xl font-bold border-b-2 border-dotted border-[#F5F5F5]">
            {data.title}
          </h1>
          <div className=" py-4 border-b-2 border-dotted border-[#F5F5F5]">
            <span className="price-sale text-[#FF2828] mr-5 text-xl font-bold  p-1">
              {formatPrice(data.priceSale)}đ
            </span>
            <span className="price text-[#939393] relative text-xl font-bold">
              {formatPrice(data.price)}đ
              <p className=" w-[100px] bg-[#939393] h-[1px] absolute left-0 bottom-[12px] "></p>
            </span>
          </div>
      
          <div className=" flex items-center gap-5 border-b-2 border-dotted border-[#F5F5F5] py-3">
            <button className=" p-[12px] border-solid border-[1px] focus:bg-black focus:text-white  border-[#F5F5F5]">
              40
            </button>
            <button className=" p-[12px] border-solid border-[1px] focus:bg-black focus:text-white  border-[#F5F5F5]">
              41
            </button>
            <button className=" p-[12px] border-solid border-[1px] focus:bg-black focus:text-white  border-[#F5F5F5]">
              42
            </button>
            <button className=" p-[12px] border-solid border-[1px] focus:bg-black focus:text-white  border-[#F5F5F5]">
              43
            </button>
            <button className=" p-[12px] border-solid border-[1px] focus:bg-black focus:text-white  border-[#F5F5F5]">
              44
            </button>
          </div>
          <div className=" flex items-center  py-3">
            <div className="border-2 border-dotted border-[#F5F5F5] ">
              <button className=" text-base w-11 h-11 bg-[#F5F5F5] font-bold">
                -
              </button>
              <span className="text-xl px-8">1</span>
              <button className=" text-base  w-11 h-11 bg-[#F5F5F5] font-bold">
                +
              </button>
            </div>
          </div>
          <div className="py-[10px]">
            <button className="detail-button text-sm  px-[13px]  py-[13px] lg:w-[60%] w-full " onClick={() => {
              setDoc(doc(db, "carts", "123456"), {
                items: [
                  {productId: 1, quantity: 1}
                ],
              }).then(() => {
                console.log("Success");
              }).catch((error) => {
                console.error(error);
              })
            }}>
              <span className=" font-bold">Thêm vào giỏ hàng</span>
            </button>
          </div>
          <div className="description  ">
            <strong>Mô Tả:</strong>
            <p className="py-4">{data.description1}</p>
            <span>{data.description2}</span>
          </div>
        </div>
      </div>
      <ProductRelate />
    </div>
  );
};

export default Detail;
