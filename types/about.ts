export default interface About {
  title: string;
  description: string;
  details?: string;
  image?: string;
}


export interface AdminAbout {
  id: number,
  title: string,
  title_ar: string,
  description: string,
  description_ar: string ,
  details: string,
  details_ar: string,
  image: string,
  createdAt: string,
  updatedAt: string,
}
