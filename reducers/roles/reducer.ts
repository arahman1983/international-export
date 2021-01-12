const rolesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ROLE":
      return [...state, action.role];
    case "EDIT_ROLE":
      return state.map((role) => {
        if (role.id === action.id) {
          return {
            ...role,
            ...action.role,
          };
        } else {
          return role;
        }
      });
    case "SET_ROLES":
      return action.roles;
    default:
      return state;
  }
};

export default rolesReducer;