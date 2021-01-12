import {AdminProduct} from '../../types/product'

export const addProduct = (product:AdminProduct) => ({
  type: "ADD_PRODUCT",
  product,
});

export const editProduct = (id:number, product:AdminProduct) => ({
  type: "EDIT_PRODUCT",
  id,
  product,
});

export const setProducts = (products:AdminProduct) => ({
  type: "SET_PRODUCTS",
  products,
});