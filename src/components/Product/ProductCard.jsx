import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import {useStateValue} from '../DataProvider/DataProvider'
import {Type} from '../../utility/action.type'
function ProductCard({ product, flex, renderDes ,renderAdd}) {
  const { image, title, id, rating, price, description } = product;
  const [state,dispatch]=useStateValue()
  
  const addToCart=()=>{
dispatch({
  type: Type.ADD_TO_BASKET,
  item: {
    image,
    title,
    id,
    rating,
    price,
    description,
  },
});
  }
  // console.log(product);
  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDes&&<div style={{maxWidth:"750px"}}>{description}</div>}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* count */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {

        renderAdd&&<button className={classes.button} onClick={addToCart}>add to cart</button>
        }
      </div>
    </div>
  );
}

export default ProductCard;
