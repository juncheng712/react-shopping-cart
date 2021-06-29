import React, { useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter"
import Products from "./components/Products";
import { Provider } from "react-redux";
import { store } from "./state/store"

// feature 1

function App() {

  // component state

  const savedCartItems = 
    localStorage.getItem("cartItems")
    ?
    JSON.parse(localStorage.getItem("cartItems"))
    :
    []
  // if user stores items in cart before, load item from local storage, otherwise return empty array
  const [cartItems, setCartItems] = useState(savedCartItems);

  // component function

  const addToCart = product => {
    const cartItemsSlice = cartItems.slice();
    let alreadyInCart = false;
    // if the item is already in cart, just increment
    cartItemsSlice.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    // if the item is not in cart, just add it in
    if (!alreadyInCart) {
      cartItemsSlice.push({...product, count: 1})
    }
    setCartItems(cartItemsSlice);
    localStorage.setItem("cartItems", JSON.stringify(cartItemsSlice))
  }

  const removeFromCart = product => {
    const cartItemsSlice = cartItems.slice(); 
    setCartItems(cartItemsSlice.filter(x => x._id !== product._id)); // ONly returns item that is not selected "remove" by user
    localStorage.setItem("cartItems", JSON.stringify(cartItemsSlice.filter(x => x._id !== product._id)))
  }
  
  const processOrder = order => {
    alert("Need to save order for " + order.name)
  }

  return (
    <Provider store={store}>
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>

      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products addToCart={addToCart} />
          </div>
          <div className="sidebar">
              <Cart 
              processOrder={processOrder}
              cartItems={cartItems} 
              removeFromCart={removeFromCart}
              />
          </div>
        </div>
      </main>

      <footer>
        All right is reserved.
      </footer>
    </div>
    </Provider>
  );
}


export default App;
