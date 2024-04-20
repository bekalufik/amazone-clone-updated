import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endPoints";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import Loader from '../../components/Loader/Loader'
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // console.log(productId)
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        // console.log(res);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      {isLoading ? <Loader /> : <ProductCard product={product} flex={true} renderDes={true} renderAdd={true}/>}
    </LayOut>
  );
};

export default ProductDetail;
