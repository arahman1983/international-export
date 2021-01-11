
export default interface Product {
  id?: string;
  title : string;
  description: string;
  details ?: string;
  image: string;
  category?: string;
  brand?: string;
}

export interface AdminProduct {
  id: number;
  title : string;
  title_ar : string;
  description: string;
  description_ar: string;
  details : string;
  details_ar : string;
  image: string;
  category: string;
  brand: string;
  keyWords: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: number;
}