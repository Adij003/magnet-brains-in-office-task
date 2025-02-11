import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, reset } from '../features/products/productSlice'
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import {FaArrowCircleRight, FaArrowCircleLeft} from 'react-icons/fa'
import ProductItem from "../components/ProductItem";

function AllProducts() {
  const dispatch = useDispatch();
    
    const { products, isProductLoading, isProductSuccess, isProductError, Productmessage } = useSelector((state) => state.product);
    

    
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
      return () => {
          if(isProductSuccess){
              dispatch(reset())
          }
      }
  }, [dispatch, isProductSuccess])


    if (isProductLoading) {
        return <Spinner />;
    }

    if (isProductError) {
        return <p>Error: {Productmessage}</p>;
    }

  
  
  return (
    <div>
      <div className="fix-width">
        {products &&  products.map((prod) => <ProductItem key={prod._id} prod={prod} />)}
      </div>
    </div>
  )
}

export default AllProducts