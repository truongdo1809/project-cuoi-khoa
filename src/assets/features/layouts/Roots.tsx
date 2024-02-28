import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Navigation from "../header/Navigation";
import Footer from "../footer/Footer";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/ConFig";
import { useDispatch } from "react-redux";
import { AuthAction } from "./../store/AuthSlice";
import { useToast } from "@chakra-ui/react";

const Roots = () => {
  const dispatch = useDispatch();
  const toast = useToast()
  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          dispatch(
            AuthAction.authenticated({
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            })
          );
        } else {
          dispatch(AuthAction.unauthenticated());
        }
      },
      (error) => {
        console.error("Authenticzation faiiled",error);
      
      },
      () => {}
    );
  }, [dispatch,toast]);
  return (
    <div>
      <Header />
      <Navigation />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Roots;
