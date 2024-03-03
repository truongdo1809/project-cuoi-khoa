import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../assets/features/fireBaseStore/ConFigStote";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../assets/features/firebase/ConFig";
import { Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { FaReply } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";
export type CartItem = {
  id: string;
  title: string;
  price: number;
  priceSale: number;
  img: string;
  quantity: number;
  size: number;
};
const Cart = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);


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

  // xóa sản phẩm
  const removeItem = async (itemId: string) => {
    // Xóa khỏi giao diện
    const confirmed = window.confirm("Bạn có muốn xóa sản phẩm này?");
    if (confirmed) {
      const newCart = cart.filter((item) => item.id !== itemId);
      setCart(newCart);
      // Xóa khỏi collection của người dùng
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData && userData.items) {
              const updatedCart = userData.items.filter(
                (item: CartItem) => item.id !== itemId
              );
              await updateDoc(userDocRef, { items: updatedCart });
            }
          }
        } catch (error) {
          alert(`Error removing item from user's cart:${error}`);
        }
      }
    };
    }

 

  //tính tổng tiền
  const sumPrice = (cart: CartItem[]): number => {
    let total = 0;
    cart.forEach((item) => {
      total += item.priceSale * item.quantity;
    });
    return total;
  };
  const totalPrice = sumPrice(cart);

  // format giá tiền
  const formatPrice = (price: number): string => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // Hàm cập nhật số lượng sản phẩm trong giỏ hàng của người dùng
  const updateCartItem = async (itemId: string, newQuantity: number) => {
    // Cập nhật số lượng sản phẩm trong state
    const newCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);

    // Cập nhật số lượng sản phẩm trong collection của người dùng
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userDocRef, {
          items: arrayUnion({ id: itemId, quantity: newQuantity }),
        });
      } catch (error) {
        alert(`Error updating item quantity in user's cart:${error}`);
      }
    }
  };

  //  tăng giảm số lượng sản phẩm
  const changeQuantity = async (itemId: string, newQuantity: number) => {
    // Kiểm tra số lượng mới phải lớn hơn hoặc bằng 1
    if (newQuantity >= 1) {
      await updateCartItem(itemId, newQuantity);
    }
  };

  
  return (
    <div className="font-sans">
      <div className="navbar-cart py-3 bg-[#F5F5F5]  px-3 xl:px-[75px] flex items-center text-[15px]">
        <span className="hover:text-[#940141]">
          <Link to={"/"}>Trang chủ</Link>
        </span>
        <p className="px-4">/</p>
        <span className=" hover:text-[#940141] text-[#777]">
          <Link to={"/cart"}>Giỏ Hàng ({cart.length})</Link>
        </span>
      </div>
      <div className=" py-9 px-3 xl:px-[75px]">
        <div className="text-center pb-9">
          <h1 className=" font-sans font-bold text-3xl mb-3">
            Giỏ hàng của bạn
          </h1>
          <span>
            Có <span className=" text-sm font-bold">{cart.length} sản phẩm</span> trong giỏ
            hàng
          </span>
          <p className=" w-16  h-[5px] bg-black mx-auto mt-6"></p>
        </div>
        <div className="md:flex md:flex-row flex-col">
          <div className="w-full md:w-8/12 px-[10px]">
            {cart.length === 0 ? (
              <div className="  justify-center my-20 flex  items-center ">
                {" "}
                <span className="text-3xl "> Your Cart is empty</span>
                <Link to={"/"}>
                  {" "}
                  <span className="text-[#FF0000] flex text-3xl items-center">
                    <FaHandPointRight className=" ms-3 mr-1" /> go to shoping
                  </span>
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex border-b-[1px] border-solid border-[##F5F5F5] py-2 "
                >
                  <div className=" w-[155px] h-[155px] ">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="md:ps-5 ps-3  w-full flex flex-col gap-2">
                    <div className="  relative">
                      <div className=" text-base font-bold">{item.title}</div>
                      <span
                        className="text-2xl cursor-pointer absolute right-0 top-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <FaXmark />
                      </span>
                    </div>
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
                          onClick={() =>
                            changeQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={1}
                          max={100}
                          className=" text-sm md:text-xl focus:outline-none text-center border-2 border-solid border-[#F5F5F5] py-2 md:py-1"
                          value={item.quantity}
                          onChange={(e) =>
                            changeQuantity(item.id, parseInt(e.target.value))
                          }
                        />

                        <button
                          className="  text-sm md:text-xl w-[40px] h-[40px] 1 bg-[#F5F5F5] font-bold"
                          onClick={() =>
                            changeQuantity(item.id, item.quantity + 1)
                          }
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
            )}
          </div>
          <div className="w-full md:w-4/12 px-[10px]">
            <div className=" p-4 mb-8">
              <h1 className=" text-xl py-[10px] font-bold border-b-[1px] border-solid border-[##F5F5F5]">
                Thông Tin Đơn Hàng
              </h1>

              <div className="py-4 flex items-center justify-between  border-b-[1px] border-solid border-[##F5F5F5]">
                <h2 className=" text-base font-bold text-[#5c5c5c] ">
                  Tổng Tiền:
                </h2>
                <span className="text-xl font-bold text-[#FF0000]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <span className="text-base text-left my-3 block">
                Phí vận chuyển sẽ được tính ở trang thanh toán. Bạn cũng có thể
                nhập mã giảm giá ở trang thanh toán.
              </span>
           {cart.length > 0 ? (   <Link to={"/checkout"}>
                <button className="detail-button  w-full  py-[5px]  rounded-md  ">
                  <span className="text-3xl tracking-widest">Thanh Toán</span>
                </button>
              </Link>):(
                <div></div>
              )}
              <Link to={"/"}>
                <div className="flex items-center justify-center py-3 text-[#FF0000]">
                  <span className="">
                    <FaReply />
                  </span>
                  <span className="ps-2">Tiếp tục mua hàng</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
