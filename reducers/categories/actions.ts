import {AdminCategory} from '../../types/categories'

export const addCategory = (category:AdminCategory) => ({
  type: "ADD_CATEGORY",
  category,
});

export const editCategory = (id:number, category:AdminCategory) => ({
  type: "EDIT_CATEGORY",
  id,
  category,
});

export const setCategories = (categories:AdminCategory) => ({
  type: "SET_CATEGORIES",
  categories,
});