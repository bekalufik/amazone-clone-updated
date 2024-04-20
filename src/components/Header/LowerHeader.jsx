import React from 'react'
import classes from "./Header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
const LowerHeader = () => {
  return (
    <div className={classes.lower__container}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Consumer Services</li>
        <li>Registery</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader