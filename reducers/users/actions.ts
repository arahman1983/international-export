import { User } from '../../types/users'

export const addUser = (user) => ({
  type: "ADD_USER",
  user,
});

export const editUser = (id:number, user) => ({
  type: "EDIT_USER",
  id,
  user,
});

export const setUsers = (users) => ({
  type: "SET_USERS",
  users,
});