import WorkOS from '@workos-inc/node';
import { NextApiRequest, NextApiResponse } from 'next';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientID = process.env.WORKOS_CLIENT_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const code = req.query.code as string
    const { profile } = await workos.sso.getProfileAndToken({
      code,
      clientID,
    });

    res.redirect(302, `/?email=${profile.email}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
