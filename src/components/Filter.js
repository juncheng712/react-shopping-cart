import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

function Filter() {

    const dispatch = useDispatch();


    const { sortProducts } = bindActionCreators(actionCreators, dispatch);
    const { filterBySize } = bindActionCreators(actionCreators, dispatch);


    const size = useSelector((state) => state.products.size);
    const sort = useSelector((state) => state.products.sort);
    const allProducts = useSelector((state) => state.products.items);
    const filteredProducts = useSelector((state) => state.products.filteredItems);
    
    return !filteredProducts ? (<div>Loading...</div>) : (
            
            <div className="filter">
                <div className="filter-result">
                    {filteredProducts.length} Products
                </div>
                <div className="filter-sort">
                    Order {" "}
                    <select value={sort} onChange={e => sortProducts(filteredProducts, e.target.value)}>
                        <option value="latest">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size">
                    Filter  {" "}
                    <select value={size} onChange={e => filterBySize(allProducts, e.target.value)}>
                        <option value="">All</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
    
            </div>
        
    )
        
        
    
}

export default Filter
