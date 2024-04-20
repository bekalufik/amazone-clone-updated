import React, { useEffect, useState } from "react";
import classes from "./Order.module.css";
import { useStateValue } from "../../components/DataProvider/DataProvider";
import { db } from "../../utility/firebase";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";

const Orders = () => {
  const [{ user, basket }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  console.log(orders);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          // console.log(snapshot)
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
    }
  }, []);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>your orders</h2>
          {
            orders?.length==0&& <div style={{padding:'20px'}}>You don't have orders yet</div>
          }
          <div>
            {orders?.map((eachOrder,i) => {
              return(
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return <ProductCard 
                    flex={true}
                    product={order}
                    key={order.id}
                    />;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
