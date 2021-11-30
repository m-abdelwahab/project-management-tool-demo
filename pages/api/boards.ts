import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const boards = await prisma.board.findMany({
        where: {
          user: {
            email: 'hey@mahmoud.codes',
          },
        },
        select: {
          title: true,
          description: true,
          id: true,
        },
      });
      res.status(200).json({ boards });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
