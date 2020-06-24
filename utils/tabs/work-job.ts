import { IForm } from "../../interfaces"

let workJobForm: IForm = [
    {question: 'Do I enjoy what I do?'},
    {question: 'Am I happy with my position?'},
    {question: 'Do I feel under-utilized in my position?', flip: true},
    {question: 'Do I get a long with my co-workers?'},
    {question: 'Do I get a long with my boss?'},
    {question: 'Is my job satisfying?'},
    {question: 'Is there good communication at work?'},
    {question: 'Does location affect my daily life? (commute)', flip: true},
    {question: 'Do I experience social problems at work?', flip: true},
    {question: 'Is work over-taking my life?', flip: true},
    {question: 'If I could do anything would I be doing this?'},
  ]
  
export default workJobForm