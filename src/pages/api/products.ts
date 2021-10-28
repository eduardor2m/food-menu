// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Product = {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const products = [
  {
    id: 1,
    category: 'carne',
    name: 'Dish 1',
    price: 10,
    image: '/images/dish1.jpg',
    description: 'descrição 1',
  },
  {
    id: 2,
    category: 'massa',
    name: 'Dish 2',
    price: 20,
    image: '/images/dish2.jpg',
    description: 'descrição 2',
  },
  {
    id: 3,
    category: 'vinho',
    name: 'Dish 2',
    price: 20,
    image: '/images/dish2.jpg',
    description: 'descrição 2',
  },
  {
    id: 4,
    category: 'vinho',
    name: 'Dish 4',
    price: 20,
    image: '/images/dish2.jpg',
    description: 'descrição 2',
  },
  {
    id: 5,
    category: 'pizza',
    name: 'Dish 5',
    price: 30,
    image: '/images/dish3.jpg',
    description: 'descrição 3',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(products);
}
