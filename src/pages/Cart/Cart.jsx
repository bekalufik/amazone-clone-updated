import React from "react";
import { useStateValue } from "../../components/DataProvider/DataProvider";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import {Type} from '../../utility/action.type'
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
const Cart = () => {
  const [{ basket }, dispatch] = useStateValue();

  const total = basket.reduce((amount, item) => {
    // console.log(item)
    return item.price * item.amount + amount;
  }, 0);

const increment=(item)=>{
dispatch({
  type:Type.ADD_TO_BASKET,
  item
})
}
const decrement=(id)=>{
dispatch({
  type:Type.REMOVE_FROM_BASKET,
  id
})
}


  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your shoping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>opps ! No items in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={classes.cart__product}>
                  <ProductCard
                    renderAdd={false}
                    key={i}
                    product={item}
                    renderDes={true}
                    flex={true}
                  />
                  <div className={classes.btn__container}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <MdKeyboardArrowUp />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <MdKeyboardArrowDown />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal {basket.length} items</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Cart;
