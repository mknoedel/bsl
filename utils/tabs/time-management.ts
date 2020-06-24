import { IForm } from "../../interfaces"

let timeManagementForm: IForm = [
    {question: 'Rate your level of importance of time management.'},
    {question: 'Do I feel there is enough time in the day?'},
    {question: 'Do I feel rushed most of the time?', flip: true},
    {question: 'Do I spend time on what I love to do?'},
    {question: 'Are my days scheduled?'},
    {question: 'If yes, do I follow that schedule?'},
    {question: 'Do I procrastinate?', flip: true},
    {question: 'Am I pro-active in accomplishing tasks on time?'},
    {question: 'Am I adaptable with my time?'},
    {question: 'Is my schedule more valuable than others?', flip: true},
    {question: 'Do I allow myself to have free time?'},
  ]
  
export default timeManagementForm