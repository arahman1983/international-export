import {AdminCategory} from '../../types/categories'

export const addBrand = (brand:AdminCategory) => ({
  type: "ADD_BRAND",
  brand,
});

export const editBrand = (id:number, brand:AdminCategory) => ({
  type: "EDIT_BRAND",
  id,
  brand,
});

export const setBrands = (brands:AdminCategory) => ({
  type: "SET_BRANDS",
  brands,
});