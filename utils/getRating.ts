import { IForm } from '../interfaces'
import _ from 'lodash'

export default function getRating(form: IForm | undefined) {
    return _.round((form?.reduce((acc, c) => acc + (c.value || 1), 0) || 1 )/(form?.length || 1), 1)
}
