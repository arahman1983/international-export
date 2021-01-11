export default interface Slide{
  h1?: string;
  h2?: string;
  image: string;
}


export interface AdminSlide{
  id: number;
  title?: string;
  title_ar?: string;
  description?: string;
  description_ar?: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: number
}