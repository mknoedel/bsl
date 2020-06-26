import verifyIdToken from '../../utils/auth/verifyIdToken'
import { NextApiResponse, NextApiRequest } from 'next'
const favoriteFoods = ['pizza', 'burger', 'chips', 'tortilla']

// An example of how to set up a simple SWR --> used for keeping data up-to-date on the client.
const getFood = async (req: NextApiRequest, res: NextApiResponse) => {
  const token: string = req.headers.token as string

  try {
    await verifyIdToken(token)
    return res.status(200).json({
      food: favoriteFoods[Math.floor(Math.random() * favoriteFoods.length)],
    })
  } catch (error) {
    return res.status(401).send('You are unauthorised')
  }
}

export default getFood