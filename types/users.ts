export interface User {
  id: number;
  userName: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}