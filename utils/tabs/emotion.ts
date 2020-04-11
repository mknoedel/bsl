import { IForm } from "../../interfaces"

let emotionForm: IForm = [
    {name: 'Do I understand what emotions are?'},
    {name: 'Am I able to control my emotions?'},
    {name: 'Do my emotions affect everyday choices?', flip: true},
    {name: 'Am I able to change emotions?'},
    {name: 'Am I happy a majority of the day?'},
    {name: 'Am I angry/mad a majority of the day?', flip: true},
    {name: 'Do things I cannot control affect my emotions?', flip: true},
    {name: 'Do outcomes of decisions affect my emotions?', flip: true},
    {name: 'Am I aware of other peoples emotions?'},
    {name: 'Can other people make me mad?', flip: true},
    {name: 'Do I wear my emotions on my sleeve?'},
  ]
  
export default emotionForm