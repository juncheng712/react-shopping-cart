import React, { useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter"
import Products from "./components/Products";
import data from "./data.json";
// feature 1

function App() {

  // component state
  const [products, setProducts] = useState(data.products)
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const savedCartItems = 
    localStorage.getItem("cartItems")
    ?
    JSON.parse(localStorage.getItem("cartItems"))
    :
    []
  // if user stores items in cart before, load item from local storage, otherwise return empty array
  const [cartItems, setCartItems] = useState(savedCartItems);

  // component function
  const sortProducts = (e) => {
    console.log(e.target.value)
    setSort(e.target.value);
    setProducts(
      data.products.slice().sort((a, b) => 
      sort === "lowest"
      ?    // if
      ( a.price < b.price ? 1 : -1 )
      :   // else
      sort === "highest"
      ?   // if
      ( a.price > b.price ? 1 : -1 )
      :   // else
      ( a._id > b._id ? 1 : -1 )
        )
      )
  }

  const filterProducts = (e) => {
    if (e.target.value === "") {
      setSize(e.target.value);
      setProducts(data.products)
    } else {
      console.log(e.target.value)
      setSize(e.target.value);
      setProducts(data.products.filter(product => product.availableSizes.indexOf(e.target.value)>=0))
    }
  }

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
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>

      <main>
        <div className="content">
          <div className="main">
            <Filter 
            count={products.length}
            size={size}
            sort={sort}
            filterProducts={filterProducts}
            sortProducts={sortProducts}
             />
            <Products products={products} addToCart={addToCart} />
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
  );
}

export default App;
