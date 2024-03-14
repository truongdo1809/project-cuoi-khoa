import { Link, useNavigate } from "react-router-dom";
// import { GrCart } from "react-icons/gr";
import { SetStateAction, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../assets/features/firebase/ConFig";
import { CartItem } from "./cart/Cart";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../assets/features/fireBaseStore/ConFigStote";
import { useToast } from "@chakra-ui/react";
// import { FaXmark } from "react-icons/fa6";
const Checkout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(true);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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

  //tính tổng tiền
  const sumPrice = (cart: CartItem[]): number => {
    let total = 0;
    cart.forEach((item) => {
      total += item.priceSale * item.quantity;
    });
    return total;
  };
  const totalPrice = sumPrice(cart);

  console.log(cart);
  // format giá tiền
  const formatPrice = (price: number): string => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const clearCart = async () => {
    try {
      if (user) {
        await deleteDoc(doc(db, "users", user.uid));
        setCart([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const setValueForm = (inputName: any, value: SetStateAction<string>) => {
    switch (inputName) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "number":
        setNumber(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };
  let isFormValid = false;

  const validateForm = () => {
    const name = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const number = document.getElementById("Number") as HTMLInputElement;
    const address = document.getElementById("address") as HTMLInputElement;

    const isNameValid = name.value.trim() !== "";
    const isEmailValid = email.value.trim() !== "";
    const isNumberValid = number.value.trim() !== "";
    const isAddressValid = address.value.trim() !== "";

    isFormValid =
      isNameValid && isEmailValid && isNumberValid && isAddressValid;
  };

  const handleCheckout = async () => {
    validateForm();

    if (isFormValid) {
      await clearCart();
      toast({
        position: "top-right",
        status: "success",
        title: "Bạn đã thanh toán thành công. Mời bạn tiếp tục mua sắm!",
      });
      navigate("/");
    } else {
      console.log("Vui lòng điền đầy đủ thông tin.");
    }
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:px-[75px]  pb-16 mx-32  pt-14">
        <div className="checkout-left">
          <span className=" text-lg font-bold my-5 block">
            Thông tin giao hàng:
          </span>
          <div className="flex flex-col justify-center">
            <div className=" w-full">
              <form className="space-y-6 " action="#" method="POST">
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
                      value={name}
                      onChange={(e) => setValueForm("name", e.target.value)}
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
                      value={email}
                      onChange={(e) => setValueForm("email", e.target.value)}
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
                      value={number}
                      onChange={(e) => setValueForm("number", e.target.value)}
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
                      checked={isChecked}
                    />
                    <span className="ms-4">Giao hàng tận nơi</span>
                  </div>
                  <div className="mt-2  p-4 border-t bg-[#FAFAFA] ">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Địa chỉ "
                      // autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0  py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={address}
                      onChange={(e) => setValueForm("address", e.target.value)}
                    />
                  </div>
                  {/* <div className=" p-4">
                    {" "}
                    <input
                      type="checkbox"
                      // autoComplete="current-password"
                      required
                      className="  text-gray-900 shadow-sm    sm:text-sm sm:leading-6"
                    />
                    <span className="ms-4">Nhận tại cửa hàng</span>
                  </div> */}
                </div>
                <div className="flex items-center justify-between">
                  <div className=" font-bold text-xl text-[#3DA9E2] hover:text-[#338bdc]">
                    <Link to={"/cart"} className="flex items-center">
                      {" "}
                      {/* <GrCart className=" mr-2" /> */}
                      giỏ hàng
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="flex justify-center py-4 w-8/12 rounded-md bg-[#3DA9E2] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleCheckout}
                  >
                    Thanh Toán
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="checkout-right lg:ps-12  pt-14 lg:pt-0">
          <span className=" text-lg font-bold my-5 block">
            Thông tin sản phẩm:
          </span>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex border-b-[1px] border-solid border-[##F5F5F5] "
            >
              <div className=" w-[155px] h-[155px]  relative">
                <img src={item.img} alt={item.title} />
                <span className=" absolute bg-[#A09F9F] p-3 rounded-full w-[2em] h-[2em] text-white flex items-center -right-3 -top-3">
                  {item.quantity}
                </span>
              </div>
              <div className="md:ps-5 ps-3  w-full flex flex-col gap-2">
                <div className=" text-base font-bold">{item.title}</div>

                <div className="">
                  <span className=" text-base">
                    {formatPrice(item.priceSale)}
                    
                  </span>
                  <span className=" text-sm ps-2 text-[#777] relative">
                    ({formatPrice(item.price)})
                    <p className="w-12 md:w-[76px] bg-[#939393] h-[1px] absolute right-0 bottom-[4px] sm:bottom-[9px]"></p>
                  </span>
                </div>
                <div className="md:flex md:items-center md:justify-between  flex-none ">
                  <span className="flex">
                    Size <p>/</p>
                    {item.size}
                  </span>

                  <div className=" text-base font-bold flex items-center md:pt-0 pt-3">
                    <span className="md:hidden block pr-2 text-sm">
                      Thành tiền:
                    </span>
                    {formatPrice(item.priceSale)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className=" py-7  border-b flex items-center justify-between ">
            <input
              type="number"
              placeholder="Mã giảm giá"
              className=" py-4  border w-9/12 mr-3 rounded-md px-4 focus:outline-[#3DA9E2]"
            />
            <button className="bg-[#c8c8c8] text-sm font-bold text-white py-4 px-6 rounded-sm focus:bg-[#3DA9E2]">
              Sử dụng
            </button>
          </div>
          <div className="flex items-center justify-between border-b">
            <span className=" text-base font-bold">Tổng Tiền:</span>
            <span className="  text-lg font-semibold py-10 ">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
