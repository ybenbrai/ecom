export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  currency: string;
  image: string;
};
