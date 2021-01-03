import { User } from '../../types/users'

export const addUser = (user:User) => ({
  type: "ADD_USER",
  user,
});

export const editUser = (id:number, user:User) => ({
  type: "EDIT_USER",
  id,
  user,
});

export const setUsers = (users:User) => ({
  type: "SET_USERS",
  users,
});