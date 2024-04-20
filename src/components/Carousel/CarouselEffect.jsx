import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import classes from "./Carousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img?.map((image,i) => {
          return <img src={image} alt="" srcSet="" key={i}/>;
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
};

export default CarouselEffect;
