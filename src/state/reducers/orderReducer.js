
const reducer = (state = {}, action) => {
    switch (action.type) {
        case "CREATE_ORDER":
            return { 
                order: action.payload
            }  // no filtered products at the beginning
        
        case "CLEAR_ORDER":
            return {
                order: null
            }

        default:
            return state

    }
}

export default reducer;
