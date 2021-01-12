const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return [...state, action.category];
    case "EDIT_CATEGORY":
      return state.map((category) => {
        if (category.id === action.id) {
          return {
            ...category,
            ...action.category,
          };
        } else {
          return category;
        }
      });
    case "SET_CATEGORIES":
      return action.categories;
    default:
      return state;
  }
};

export default categoriesReducer;