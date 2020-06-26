import * as admin from 'firebase-admin';
import initFirebase from '../../../utils/auth/initFirebase';
import verifyIdToken from '../../../utils/auth/verifyIdToken';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserData } from '../../../interfaces';

initFirebase()

const getData = async (userId: string): Promise<UserData> => {
    return (
        await admin
        .firestore()
        .doc(`/users/${userId}`)
        .get()
    ).data() as UserData;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token: string = req.headers.token as string
    const { id } = req.query
    try {
        await verifyIdToken(token)
        return res.status(200).send(getData(Array.isArray(id) ? id[0] : id));
    } catch (err) {
        return res.status(err.code).send({
        errorCode: err.code,
        message: err.message,
        });
    }
    }