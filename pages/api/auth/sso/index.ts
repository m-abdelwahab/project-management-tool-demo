import WorkOS from '@workos-inc/node';
import { NextApiRequest, NextApiResponse } from 'next';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientID = process.env.WORKOS_CLIENT_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.body;
    const authorizationUrl = workos.sso.getAuthorizationURL({
      domain: email.split('@')[1],
      clientID,
      redirectURI: 'http://localhost:3000/api/auth/sso/callback',
    });
    res.status(200).json({ authorizationUrl });
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
