import { IForm } from "../../interfaces"

let workJobForm: IForm = [
    {name: 'Do I enjoy what I do?'},
    {name: 'Am I happy with my position?'},
    {name: 'Do I feel under-utilized in my position?', flip: true},
    {name: 'Do I get a long with my co-workers?'},
    {name: 'Do I get a long with my boss?'},
    {name: 'Is my job satisfying?'},
    {name: 'Is there good communication at work?'},
    {name: 'Does location affect my daily life? (commute)', flip: true},
    {name: 'Do I experience social problems at work?', flip: true},
    {name: 'Is work over-taking my life?', flip: true},
    {name: 'If I could do anything would I be doing this?'},
  ]
  
export default workJobForm