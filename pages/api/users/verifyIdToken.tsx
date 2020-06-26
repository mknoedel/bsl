import verifyIdToken from '../../../utils/auth/verifyIdToken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token: string = req.headers.token as string
    try {
        await verifyIdToken(token)
        res.status(200).send({})
    } catch (error) {
        return res.status(401).send({message: error.errorInfo?.message || error.message});
    }
    }