import React from "react";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import classes from "./Results.module.css";
import ProductCard from "../../components/Product/ProductCard";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
const Results = () => {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  }, [categoryName]);

  console.log(categoryName);
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Categroy</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products__container}>
            {results?.map((product) => {
              return (
                <ProductCard
                  product={product}
                  key={product.id}
                  renderDes={false}
                  renderAdd={true}
                />
              );
            })}
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Results;
