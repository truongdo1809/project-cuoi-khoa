import { useQuery } from "@tanstack/react-query";
import "./detail.css";
import { Link, useParams } from "react-router-dom";
import ProductRelate from "./ProductRelate";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../assets/features/fireBaseStore/ConFigStote";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../assets/features/firebase/ConFig";
import { Spinner, useToast } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


type Item = {
  id: number;
  quantity: number;
  size: number;
};

const Detail = () => {

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string>();

  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return fetch("https://api-tomoyoo.vercel.app/products/" + id).then(
        (res) => res.json()
      );
    },
  });

  const toast = useToast();
  const [user, changeUser] = useState<User|null>();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log("User", user);
      changeUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const handleAddCart = async () => {
    if (!user) {
      return toast({
        position:"top-right",
        status: "info",
        title: "Please log in to purchase",
      });
    }
  
  
    // Kiểm tra xem người dùng đã chọn size chưa
    if (!size || size === "Size") {
      return toast({
        position:"top-right",
        status: "error",
        title: "vui lòng chọn size",
      });
    }
  

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    if (userData && userData.items) {
      const updatedItems = userData.items.map((item: Item) => {
        if (item.id === data.id) {
          // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng mới
          const newQuantity = item.quantity + quantity;
          return { ...item, quantity: newQuantity, size: size };
        }
        return item;
      });

      // Nếu sản phẩm chưa có trong giỏ hàng, add thêm sản phẩm
      if (!updatedItems.find((item: Item) => item.id === data.id)) {
        updatedItems.push({
          id: data.id,
          quantity: quantity,
          size: size,
          price: data.price,
          priceSale: data.priceSale,
          title: data.title,
          img: data.img,
        });
        
      }

      await updateDoc(userRef, {
        items: updatedItems,
      });
      toast({
        position:"top-right",
        status: "success",
        title: "Đã thêm sản phẩm vào giỏ hàng",
      })
    } else {
      // Nếu chưa có items khởi tạo items mới
      await setDoc(userRef, {
        items: [
          {
            id: data.id,
            quantity: quantity,
            size: size,
            price: data.price,
            priceSale: data.priceSale,
            title: data.title,
            img: data.img,
          },
        ],
      });
      toast({
        position:"top-right",
        status: "success",
        title: "Đã thêm sản phẩm vào giỏ hàng",
      })
    }
  };

  const handleQuantityChange = (event: { target: { value: string; }; }) => {
    let value = parseInt(event.target.value);
    if (value < 1) {
      // Nếu giá trị nhỏ hơn 1, sẽ set giá trị là 1
      value = 1;
    }
    setQuantity(value);
  };

  const decreaseQuantity = () => {
    // Giảm giá trị số lượng, nhưng không cho nó nhỏ hơn 1
    setQuantity(Math.max(1, quantity - 1));
  };

  const increaseQuantity = () => {
    // Tăng giá trị số lượng
    setQuantity(quantity + 1);
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
      <div className="navbar-detail py-3 bg-[#F5F5F5]  px-3 xl:px-[75px] flex items-center text-[13px] flex-wrap ">
        <span className="hover:text-[#940141]">
          <Link to={"/"}>Trang chủ</Link>
        </span>
        <p className=" px-3">/</p>
        <span className="hover:text-[#940141] pr-2">
          <Link to={"/product"}>{data.type}</Link>
        </span>
      
        <span className="hover:text-[#940141] flex items-center" >/ {data.title}</span>
      </div>
      <div className="detail-card flex-hidden lg:flex px-3 xl:px-[75px] font-sans pt-8 pb-12">
        <div className="detail-left w-full lg:w-5/12 px-[15px]">
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
         {data.slider.map((img:string, index:number) => ( 
          
        <SwiperSlide key={index}> 
          <img className=" w-full h-full object-cover" src={img} alt={`Slide ${index}`} /> 
         
        </SwiperSlide>
      ))}
        </Swiper>
      </div>
        </div>
        <div className="detail-right w-full lg:w-7/12 px-[15px]">
          <h1 className=" pb-3  text-xl font-bold border-b-2 border-dotted border-[#F5F5F5] pt-5 lg:pt-0">
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

          <select
            className="my-3  gap-7 p-4 border-2 border-solid border-[#F5F5F5]"
            value={size}
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="Size"> Size</option>

            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
          </select>
          <div className=" flex items-center  py-3">
            <div className="border-2 border-dotted border-[#F5F5F5] ">
              <button
                className=" text-base w-11 h-11 bg-[#F5F5F5] font-bold"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <input
                type="number"
                onChange={handleQuantityChange}
                value={quantity}
                min={1}
                max={100}
                className="text-xl px-8 focus:outline-none text-center"
              />

              <button
                className=" text-base  w-11 h-11 bg-[#F5F5F5] font-bold"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>
          <div className="py-[10px]">
            <button
              className="detail-button text-sm  px-[13px]  py-[13px] lg:w-[60%] w-full "
              onClick={handleAddCart}
            >
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