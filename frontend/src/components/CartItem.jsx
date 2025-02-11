import React from "react";

function CartItem({ cartItem }) {
  return (
    <div className="cart-item">
      <img src={cartItem.productId.image} alt={cartItem.productId.name} width="50" />
      <div>
        <h4>{cartItem.productId.name}</h4>
        <p>Price: Rs.{cartItem.productId.price}/-</p>
        <p>Quantity: {cartItem.quantity}</p>
      </div>
    </div>
  );
}

export default CartItem;
