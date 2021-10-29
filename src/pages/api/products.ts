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

export const products = [
  {
    id: 1,
    category: 'carne',
    name: 'Picanha',
    price: 32.5,
    image:
      'https://www.minervafoods.com/wp-content/uploads/2020/08/picanha_1.jpg',
    description:
      'Picanha com acompanhamentos, porção de arroz, feijão tropeiro e vinagrete',
  },
  {
    id: 2,
    category: 'massa',
    name: 'Macarrão Ao Molho Branco',
    price: 20,
    image:
      'https://img.itdg.com.br/tdg/images/recipes/000/145/994/353696/353696_original.jpg?mode=crop&width=710&height=400',
    description: 'Macarrão com queijo italiano e molho de wasaby',
  },
  {
    id: 3,
    category: 'vinho',
    name: 'Vinho Branco',
    price: 20,
    image:
      'https://emporioconfrades.com.br/wp-content/uploads/2019/08/tacas-de-vinho-branco.jpg',
    description:
      'Persistente, refrescante, saboroso e crocante, com toques de menta e frutas cítricas',
  },
  {
    id: 4,
    category: 'vinho',
    name: 'Vinho Tinto',
    price: 20,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ARZ-6WQe41vsbXb_NtwhxXdF9t-vuUAUCw&usqp=CAU',
    description: 'Encorpado, saboroso e frutado, com final levemente adocicado',
  },
  {
    id: 5,
    category: 'pizza',
    name: 'Pizza 4 Queijos',
    price: 30,
    image:
      'https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-quatro-queijos-1.jpg',
    description: 'Mussarela, parmesão, provolone, gorgonzola',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(products);
}
