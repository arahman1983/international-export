const productsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.product];
    case "EDIT_PRODUCT":
      return state.map((product) => {
        if (product.id === action.id) {
          return {
            ...product,
            ...action.product,
          };
        } else {
          return product;
        }
      });
    case "SET_PRODUCTS":
      return action.products;
    default:
      return state;
  }
};

export default productsReducer;