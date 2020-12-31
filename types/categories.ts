export default interface Category {
  id: string;
  name : string;
}

export interface AdminCategory {
  id?: number;
  title : string;
  title_ar: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted: boolean;
}