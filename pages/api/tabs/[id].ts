import { NextApiRequest, NextApiResponse } from 'next'
import tabs from '../../../utils/tabs'
import _ from 'lodash'

export default (req: NextApiRequest, res: NextApiResponse) => {
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
