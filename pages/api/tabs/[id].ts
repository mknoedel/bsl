import { NextApiRequest, NextApiResponse } from 'next'
import tabs from '../../../utils/tabs'
import _ from 'lodash'

// This will be used as a means of retrieving data from the user for the existing form. Form data should come from the parent component.
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const selected = _.find(tabs, (tab) => _.kebabCase(tab.name) === id)
    if (!selected) {
      throw new Error('Cannot find tab')
    }
    res.status(200).json({ data: selected})
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}
