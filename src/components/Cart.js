import React, { useState } from 'react';
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";

function Cart({cartItems, removeFromCart, processOrder}) {

    const [checkout, setCheckout] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const createOrder = e => {
        e.preventDefault();
        const order = {
            name,
            email,
            address,
            cartItems
        };
        processOrder(order)
    }

    return (
        <div>
            {
            cartItems.length === 0 
            ? 
            <div className="cart cart-header">Cart is empty</div>
            :
            <div className="cart cart-header">You have {cartItems.length} in the cart{" "}</div>
            }
            <div>
             <div className="cart">
                 <Fade left cascade>
                    <ul className="cart-items">
                    {
                    cartItems.map(item => (
                        <li key={item._id}>
                            <div>
                                <img src={item.image} alt={item.title}></img>
                            </div>
                            <div>
                                <div>{item.title}</div>
                                <div className="right">
                                    {formatCurrency(item.price)} x {item.count} {" "}
                                    <button className="button" onClick={() => removeFromCart(item)}>Remove</button>
                                </div>
                            </div>
                        </li>
                        ))
                        }
                    </ul>
            </Fade>
            </div>
            {
                cartItems.length!==0 && (
                    <div>
                    <div className='cart'>
                        <div className="total">
                            <div className="">
                                Total: {" "}
                                {formatCurrency(cartItems.reduce((a, c) => a + (c.price*c.count), 0))}
                                {/* a for accumulator, c for cartItems, 0 for initial value */}
                            </div>
                            <button className="button primary" onClick={() => setCheckout(true)} >Proceed</button>
                        </div>
                    </div>
                    {
                        checkout
                        &&
                        (
                            <Fade right cascade>
                            <div className="cart">
                                <form onSubmit={createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label htmlFor="email">Email</label>
                                                <input name="email" type="email" value={email}
                                                required onChange={(e) => setEmail(e.target.value)} />
                                        </li>
                                        <li>
                                            <label htmlFor="name">Name</label>
                                                <input name="name" type="text" required  value={name}
                                                onChange={(e) => setName(e.target.value)} />
                                        </li>
                                        <li>
                                            <label htmlFor="address">Address</label>
                                                <input name="address" type="text" required  value={address}
                                                onChange={(e) => setAddress(e.target.value)} />
                                        </li>
                                        <li>
                                            <button type="submit" className="button primary">Checkout</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                            </Fade>
                        )
                    }
                    </div>
                    
                )
            }
        </div>
        </div>
        
    
        
    )
}

export default Cart
