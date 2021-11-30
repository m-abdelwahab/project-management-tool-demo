import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const board = await prisma.board.findUnique({
        where: {
          id: req.query.id as string,
        },
        include: {
          lists: {
            include: {
              cards: true,
            },
          },
        },
      });
      res.status(200).json({ board });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
