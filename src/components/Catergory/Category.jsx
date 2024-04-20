import React from "react";
import { categoryInfo } from "./categoryFullInfos";
import CategoryCard from "./CategoryCard";
import classes from './Category.module.css'
function Category() {
  return (
    <section className={classes.category__container}>
      {categoryInfo?.map((info, index) => {
        return <CategoryCard data={info} key={index} />;
      })}
    </section>
  );
}

export default Category;
