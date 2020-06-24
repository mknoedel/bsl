import { IForm } from "../../interfaces"

let trustForm: IForm = [
    {question: 'Do I trust myself?'},
    {question: 'Do I trust others?'},
    {question: 'Do I understand what trust is?'},
    {question: 'Can I trust others if I do not know them?'},
    {question: 'Can others trust me?'},
    {question: 'Do I trust my family?'},
    {question: 'Do I trust my friends?'},
    {question: 'Do I trust co-workers?'},
    {question: 'Is it difficult to trust in others?', flip: true},
    {question: 'Do past experiences affect how I trust now?', flip: true},
    {question: 'Am I trustworthy?'},
  ]
  
export default trustForm