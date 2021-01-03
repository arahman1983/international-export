const slidesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_SLIDE":
      return [...state, action.slide];
    case "EDIT_SLIDE":
      console.log(action)
      return state.map((slide) => {
        if (slide.id === action.id) {
          return {
            ...slide,
            ...action.slide,
          };
        } else {
          return slide;
        }
      });
    case "SET_SLIDES":
      return action.slides;
    default:
      return state;
  }
};

export default slidesReducer;