
export const addToCart = (product) => {
    return (dispatch, getState) => {
        const cartItems = getState().cart.cartItems.slice();
        let alreadyExists = false;
        cartItems.forEach(cartItem => {
            if (cartItem._id === product._id) {
                alreadyExists = true;
                cartItem.count++;
            }
        })
            if (!alreadyExists) {
                cartItems.push({...product, count: 1});
            }
        dispatch({
            type: 'ADD_TO_CART', 
            payload: {cartItems}
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
}

export const removeFromCart = (product) => {
    return (dispatch, getState) => {
        const cartItems = getState().cart.cartItems.slice().filter(cartItem => cartItem._id != product._id);
        dispatch({
            type: 'REMOVE_FROM_CART', 
            payload: {cartItems}
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
}