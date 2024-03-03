import { Link } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../assets/features/firebase/ConFig";
import { CartItem } from "./cart/Cart";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../assets/features/fireBaseStore/ConFigStote";
import { FaXmark } from "react-icons/fa6";
const Checkout = () => {

  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  //lấy thông tin sản phẩm theo user người dùng
  console.log(user);
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

console.log(cart);
 // format giá tiền
 const formatPrice = (price: number): string => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};


  return (
    <div className=" font-sans">
      <div>
        {" "}
        <div className="navbar-detail py-3 bg-[#F5F5F5]  px-3 xl:px-[75px] flex items-center text-[13px] flex-wrap ">
          <span className="hover:text-[#940141]">
            <Link to={"/"}>Trang chủ</Link>
          </span>
          <p className=" px-3">/</p>
          <span className="hover:text-[#940141] pr-2">
            <Link to={"/checkout"}>Checkout</Link>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 px-[75px]  pb-16 mx-32  pt-14">
        <div className="checkout-left">
          <Link to={"/"}>
            {" "}
            <h1 className=" text-3xl font-bold">
              TOMOYO-Thế giới đồ da thủ công công nghệ Nhật
            </h1>
          </Link>
          <span className=" text-lg font-bold my-5 block">
            Thông tin giao hàng:
          </span>
          <div className="flex flex-col justify-center">
            <div className=" sm:w-full sm:max-w-sm">
              <form
                className="space-y-6 w-full min-w-[600px]"
                action="#"
                method="POST"
              >
                <div>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Họ Tên"
                      className=" block w-full rounded-md border-0  py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
                    />
                  </div>
                </div>

                <div className=" flex items-center">
                  <div className="mt-2 w-7/12 mr-3">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0  py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="mt-2 w-5/12">
                    <input
                      id="Number"
                      name="Number"
                      type="number"
                      placeholder="Number"
                      // autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0  py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="mt-2 ư-full border-2  rounded-lg">
                  <div className=" p-4">
                    {" "}
                    <input
                    
                      id="Number"
                      name="Number"
                      type="checkbox"
                      placeholder="Number"
                      // autoComplete="current-password"
                      required
                      className="  text-gray-900 shadow-sm    sm:text-sm sm:leading-6"
                    />
                    <span className="ms-4">Giao hàng tận nơi</span>
                  </div>
                  <div className="mt-2  p-4 border-t bg-[#FAFAFA] ">
                    <input
                      id="text"
                      name="text"
                      type="text"
                      placeholder="Địa chỉ "
                      // autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0  py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className=" font-bold text-xl text-[#3DA9E2] hover:text-[#338bdc]">
                    <Link to={"/cart"} className="flex items-center">
                      {" "}
                      <GrCart className=" mr-2" />
                      giỏ hàng
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="flex justify-center py-4 w-8/12 rounded-md bg-[#3DA9E2] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Thanh Toán
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="checkout-right ps-12">
          { cart.map((item) => (
              <div
                key={item.id}
                className="flex border-b-[1px] border-solid border-[##F5F5F5] py-2 "
              >
                <div className=" w-[155px] h-[155px] ">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="md:ps-5 ps-3  w-full flex flex-col gap-2">
                 
                    <div className=" text-base font-bold">{item.title}</div>
                   
               
                  <div className="">
                    <span className=" text-base">
                      {formatPrice(item.priceSale)}
                    </span>

                    <span className=" text-sm ps-2 text-[#777]">
                      ({formatPrice(item.price)})
                    </span>
                  </div>
                  <span className="flex">
                    Size <p>/</p>
                    {item.size}
                  </span>
                  <div className="md:flex md:items-center md:justify-between  flex-none ">
                    <div className="  ">
                      <button
                        className=" text-sm md:text-xl w-[40px] h-[40px] bg-[#F5F5F5] font-bold"
                       
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        className=" text-sm md:text-xl focus:outline-none text-center border-2 border-solid border-[#F5F5F5] py-2 md:py-1"
                        value={item.quantity}
                      
                      />

                      <button
                        className="  text-sm md:text-xl w-[40px] h-[40px] 1 bg-[#F5F5F5] font-bold"
                      
                      >
                        +
                      </button>
                    </div>
                    <div className=" text-base font-bold flex items-center md:pt-0 pt-3">
                      <span className="md:hidden block pr-2 text-sm">
                        Thành tiền:
                      </span>
                      {formatPrice(item.priceSale)}
                    </div>
                  </div>
                </div>
              </div>
            ))
             }
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;
