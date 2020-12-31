export default interface Category {
  id: string;
  name : string;
}

export interface AdminCategory {
  id: number;
  name : string;
  name_ar: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}