import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartItem from '../components/CartItem';
import Spinner from '../components/Spinner';
import { getCart, resetCartState } from "../features/cart/cartSlice";




function Order() {
      const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
      const { cart, isCartSuccess, isCartError, cartMessage, isCartLoading } = useSelector((state) => state.cart);
  
  const navigate = useNavigate();

      useEffect(() => {
          dispatch(getCart());
      }, [dispatch]);


      if (isCartLoading) {
        return <Spinner />;
    }

    if (isCartError) {
        return <p>Error: {cartMessage}</p>;
    }

  const handleCheckout = async () => {
    try {
      if (!user || !user.token) {
        toast.error("User is not authenticated");
        return;
      }
  
      const response = await fetch("http://localhost:5000/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, 
        },
        body: JSON.stringify({ cartItems: cart.items }),
      });
  
      const data = await response.json();
      if (response.ok && data.url) {
        window.location.href = data.url; // Redirect user to Stripe checkout
      } else {
        throw new Error(data.message || "Failed to initiate checkout");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message);
    }
  };
  

  return (
    <div>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={user.name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={user.email} disabled />
        </div>
      </section>

      <div className="cart-container">
                <h2>Your Cart</h2>
                {cart && cart.items && cart.items.length > 0 ? (
                    <div className="cart-grid">
                        {cart.items.map((cartItem) => (
                            <CartItem key={cartItem._id} cartItem={cartItem} />
                        ))}
                    </div>
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
      <button className="add-to-cart" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Order;
