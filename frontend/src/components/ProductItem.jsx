import { useDispatch, useSelector } from "react-redux";
import { addToCart, resetCartState } from "../features/cart/cartSlice";
import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

function ProductItem({ prod }) {
  const dispatch = useDispatch();
  const { isCartSuccess, isCartError, cartMessage } = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    dispatch(addToCart(prod._id)); // Dispatch addToCart action
  };

  useEffect(() => {
    if (isCartSuccess) {
    
      dispatch(resetCartState()); // Reset state after success
    }
    if (isCartError) {
      toast.error(cartMessage || "Failed to add item to cart.");
      dispatch(resetCartState());
    }
  }, [isCartSuccess, isCartError, cartMessage, dispatch]);

  return (
    <div className="card-img">
      <img src={prod.image} alt={prod.name} style={{ width: "100%" }} />
      <div className="container-img">
        <h4><b>{prod.name}</b></h4>
        <h4><b>${prod.price}</b></h4>
        <p>{prod.description}</p>
        <button className="add-to-cart" onClick={handleAddToCart}>
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
