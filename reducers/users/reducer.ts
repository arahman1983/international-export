const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.user];
    case "EDIT_USER":
      return state.map((user) => {
        if (user.id === action.id) {
          console.log(action)
          return {
            ...user,
            ...action.user,
          };
        } else {
          return user;
        }
      });
    case "SET_USERS":
      return action.users;
    default:
      return state;
  }
};

export default usersReducer;