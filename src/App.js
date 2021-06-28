import React, { useState } from "react";
import Filter from "./components/Filter"
import Products from "./components/Products";
import data from "./data.json";
// feature 1

function App() {

  const [products, setProducts] = useState(data.products)
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

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
            <Products products={products} />
          </div>
          <div className="sidebar">
              Cart Items
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
