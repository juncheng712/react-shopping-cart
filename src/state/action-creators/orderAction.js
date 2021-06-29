
export const makeOrder = (order) => {
    return (dispatch) => {
        fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: 'CREATE_ORDER', 
                payload: data
            });
            localStorage.clear("cartItems");
            dispatch({
                type: "CLEAR_CART"
            })
        })
    }
}

export const clearOrder = () => {
    return (dispatch) => {
        dispatch({
            type: "CLEAR_ORDER"
        })
    }
}