import React from 'react'
import CarouselEffect from '../../components/Carousel/CarouselEffect'
import Category from '../../components/Catergory/Category'
import Product from '../../components/Product/Product'
import LayOut from '../../components/LayOut/LayOut'
function Landing() {
  return (
    <LayOut>
        <CarouselEffect />
        <Category />
        <Product />
    </LayOut>
  )
}

export default Landing