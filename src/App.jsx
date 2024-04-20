import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header";
import CarouselEffect from "./components/Carousel/CarouselEffect";
import Category from "./components/Catergory/Category";
import Product from "./components/Product/Product";
import Routing from "./Routing";
import { useStateValue } from "./components/DataProvider/DataProvider";
import { Type } from "./utility/action.type";
import { auth } from "./utility/firebase";
function App() {
  const [{ user, basket }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
