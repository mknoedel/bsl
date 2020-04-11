import { IForm } from "../../interfaces"

let trustForm: IForm = [
    {name: 'Do I trust myself?'},
    {name: 'Do I trust others?'},
    {name: 'Do I understand what trust is?'},
    {name: 'Can I trust others if I do not know them?'},
    {name: 'Can others trust me?'},
    {name: 'Do I trust my family?'},
    {name: 'Do I trust my friends?'},
    {name: 'Do I trust co-workers?'},
    {name: 'Is it difficult to trust in others?', flip: true},
    {name: 'Do past experiences affect how I trust now?', flip: true},
    {name: 'Am I trustworthy?'},
  ]
  
export default trustForm