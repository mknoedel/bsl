import { IForm } from "../../interfaces"

let timeManagementForm: IForm = [
    {name: 'Rate your level of importance of time management.'},
    {name: 'Do I feel there is enough time in the day?'},
    {name: 'Do I feel rushed most of the time?', flip: true},
    {name: 'Do I spend time on what I love to do?'},
    {name: 'Are my days scheduled?'},
    {name: 'If yes, do I follow that schedule?'},
    {name: 'Do I procrastinate?', flip: true},
    {name: 'Am I pro-active in accomplishing tasks on time?'},
    {name: 'Am I adaptable with my time?'},
    {name: 'Is my schedule more valuable than others?', flip: true},
    {name: 'Do I allow myself to have free time?'},
  ]
  
export default timeManagementForm