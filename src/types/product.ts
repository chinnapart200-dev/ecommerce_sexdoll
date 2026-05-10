export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  salePrice: number | null;
  imageUrl: string;
  categoryId: number;
  categoryName?: string;
  isFeatured: boolean;
  isNew: boolean;
  stock: number;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

