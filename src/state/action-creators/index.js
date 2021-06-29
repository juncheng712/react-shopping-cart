
export const fetchProducts = () => {
    return async (dispatch) => {
        const res  = await fetch('/api/products');
        const data = await res.json();
        dispatch({
            type: 'FETCH_PRODUCTS', 
            payload: data
        })
    }
}

export const filterBySize = (products, size) => {
    return (dispatch) => {
        dispatch({
            type: 'FILTER_BY_SIZE',
            payload: {
                size: size,
                items: 
                (size === "") 
                ? 
                products 
                : 
                products.filter(product => product.availableSizes.indexOf(size)>=0)
            }
        })
    }
}

export const sortProducts = (filteredProducts, sort) => {
    const sortedProducts = filteredProducts.slice();
    if (sort === "latest") {
        sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
    } else {
        sortedProducts.sort((a, b) => (
            sort === "lowest" 
            ?
            a.price > b.price ? 1 : -1   // lowest price
            :
            a.price > b.price ? -1 : 1   // highest price
        ))
    }
    return (dispatch) => {
        dispatch({
            type: 'ORDER_PRODUCTS_BY_PRICE', 
            payload: {
                sort: sort,
                items: sortedProducts
            }
        })
    }
}
