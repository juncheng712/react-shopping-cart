
const reducer = (state = {}, action) => {
    switch (action.type) {
        case "FILTER_BY_SIZE":
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items,
            }


        case "ORDER_PRODUCTS_BY_PRICE":
            return {
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items,
            }



        case "FETCH_PRODUCTS":
            return { 
                items: action.payload, 
                filteredItems: action.payload }  // no filtered products at the beginning


        default:
            return state

    }
}

export default reducer;
