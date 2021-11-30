import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const session = await getSession({ req });
      if (session) {
        const newBoard = await prisma.board.create({
          data: {
            title: req.body.title,
            description: req.body.description,
            user: {
              connect: {
                email: `${session.user?.email}`,
              },
            },
          },
        });
        res.status(200).json({ newBoard });
      } else {
        res.status(401);
      }
      res.end();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: `Can't ${req.method}` });
  }
}
