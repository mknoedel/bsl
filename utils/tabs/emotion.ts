import { IForm } from "../../interfaces"

let emotionForm: IForm = [
    {question: 'Do I understand what emotions are?'},
    {question: 'Am I able to control my emotions?'},
    {question: 'Do my emotions affect everyday choices?', flip: true},
    {question: 'Am I able to change emotions?'},
    {question: 'Am I happy a majority of the day?'},
    {question: 'Am I angry/mad a majority of the day?', flip: true},
    {question: 'Do things I cannot control affect my emotions?', flip: true},
    {question: 'Do outcomes of decisions affect my emotions?', flip: true},
    {question: 'Am I aware of other peoples emotions?'},
    {question: 'Can other people make me mad?', flip: true},
    {question: 'Do I wear my emotions on my sleeve?'},
  ]
  
export default emotionForm