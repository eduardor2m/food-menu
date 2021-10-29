import type { NextApiRequest, NextApiResponse } from 'next';

import { products } from '../products';

type Product = {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

type Message = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | Message>
) {
  const product = products.find(
    (p) => p.id === parseInt(req.query.slug as string, 10)
  );
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}
