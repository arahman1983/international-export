const brandsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_BRAND":
      console.log(action.brand)
      return [...state, action.brand];
    case "EDIT_BRAND":
      return state.map((brand) => {
        if (brand.id === action.id) {
          return {
            ...brand,
            ...action.brand,
          };
        } else {
          return brand;
        }
      });
    case "SET_BRANDS":
      return action.brands;
    default:
      return state;
  }
};

export default brandsReducer;