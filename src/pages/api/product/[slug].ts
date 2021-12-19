import faunadb from 'faunadb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { fauna } from '../../../services/fauna';

const q = faunadb.query;

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
  if (req.method === 'GET') {
    const slug = req.query.slug;

    if (!slug) {
      res.status(400).json({ message: 'Invalid slug' });
      return;
    }

    fauna
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('products_by_id'), slug)),
          q.Lambda('x', q.Get(q.Var('x')))
        )
      )
      .then((response: any) => {
        const product = response.data;

        if (!product) {
          res.status(404).json({ message: 'Product not found' });
          return;
        }

        res.status(200).json(product);
      })
      .catch((error: any) => {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      });
  }
  if (req.method === 'DELETE') {
    const { slug: id } = req.query;

    if (!id) {
      res.status(400).json({ message: 'Invalid id' });
      return;
    }

    fauna
      .query(q.Delete(q.Ref(q.Collection('products'), id)))
      .then((response: any) => {
        if (response.data.deleted === 0) {
          res.status(404).json({ message: 'Product not found' });
          return;
        }

        res.status(200).json({ message: 'Product deleted' });
      })
      .catch((error: any) => {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      });
  }
}
