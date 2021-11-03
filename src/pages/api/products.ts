import faunadb, { Lambda } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';

import { fauna } from '../../services/fauna';

const q = faunadb.query;

type Product = {
  data: [
    {
      data: {
        id: string;
        category: string;
        name: string;
        price: number;
        description: string;
        image: string;
      };
    }
  ];
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { data } = await fauna.query<Product>(
      q.Map(
        q.Paginate(q.Documents(q.Collection('products'))),
        Lambda('productsRef', q.Get(q.Var('productsRef')))
      )
    );
    const products = data.map((product) => {
      return {
        id: product.data.id,
        name: product.data.name,
        price: product.data.price,
        description: product.data.description,
        image: product.data.image,
      };
    });

    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const product = req.body;
    const data = await fauna.query(
      q.Create(q.Collection('products'), {
        data: {
          ...product,
        },
      })
    );

    res.status(200).json(data);
  }
};
