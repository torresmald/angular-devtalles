import { User } from '@/auth/interfaces/user.interface';

export interface ProductResponse {
  count: number;
  pages: number;
  products: Product[];
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: string;
  tags: Tag[];
  images: string[];
  user: User;
}

export interface FilesUpload {
  secureUrl: string,
  fileName: string
}

export enum Gender {
  Kid = 'kid',
  Women = 'women',
  Men = 'men',
  Unisex = 'unisex',
}

export enum Size {
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS',
  Xxl = 'XXL',
}

export enum Tag {
  Hoodie = 'hoodie',
  Shirt = 'shirt',
}
