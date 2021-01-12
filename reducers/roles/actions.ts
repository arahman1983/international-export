import {AdminCategory} from '../../types/categories'

export const addRole = (role:AdminCategory) => ({
  type: "ADD_ROLE",
  role,
});

export const editRole = (id:number, role:AdminCategory) => ({
  type: "EDIT_ROLE",
  id,
  role,
});

export const setRoles = (roles:AdminCategory) => ({
  type: "SET_ROLES",
  roles,
});