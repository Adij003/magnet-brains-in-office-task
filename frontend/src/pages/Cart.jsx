import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCart, resetCartState } from "../features/cart/cartSlice";
import { placeOrder } from '../features/order/orderSlice';
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';
import CartItem from '../components/CartItem';
import {useNavigate} from 'react-router-dom';

function Cart() {
    const dispatch = useDispatch();
    
    const { cart, isCartSuccess, isCartError, cartMessage, isCartLoading } = useSelector((state) => state.cart);

    const navigate = useNavigate()

    const { isOrderLoading, isOrderSuccess, isOrderError, orderMessage } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    // useEffect(() => {
    //     if (isCartSuccess) {
    //         dispatch(resetCartState());
    //     }
    // }, [dispatch, isCartSuccess]);

    useEffect(() => {
        if (isOrderSuccess) {
            navigate('/order')
            toast.success("Please Click on pay here");
        }
        if (isOrderError) {
            // toast.error(orderMessage || "Order placement failed");
            console.log('checking..')
        }
    }, [isOrderSuccess, isOrderError, orderMessage]);

    const handleCheckout = () => {
        dispatch(placeOrder());
        if(isOrderSuccess){
            navigate('/order')
        }
    };

    if (isCartLoading) {
        return <Spinner />;
    }

    if (isCartError) {
        return <p>Error: {cartMessage}</p>;
    }

    return (
        <>
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
            <div>
                <button 
                    className='add-to-cart' 
                    onClick={handleCheckout} 
                    disabled={isOrderLoading}
                >
                    {isOrderLoading ? "Processing..." : "Checkout"}
                </button>
            </div>
        </>
    );
}

export default Cart;
