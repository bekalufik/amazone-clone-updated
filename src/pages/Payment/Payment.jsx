import React, { useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { useStateValue } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import {db} from '../../utility/firebase'
import { useNavigate } from "react-router-dom";
import { Type } from "../../utility/action.type";
const Payment = () => {
  const [{ user, basket }, dispatch] = useStateValue();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate()

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    //  console.log(item);
    return item.price * item.amount + amount;
  }, 0);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response?.data?.clientSecret;

      const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
        basket:basket,
        amount:paymentIntent.amount,
        created:paymentIntent.created
      })
dispatch({
  type:Type.EMPTY_BASKET
})
      setProcessing(false);
      navigate('/orders',{state:{msg:"you have placed new order"}})
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment__header}>checkout {totalItem} items</div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, It</div>
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => {
              return <ProductCard product={item} flex={true} />;
            })}
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Payment methods</h3>

          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form action="" onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />

                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
