export interface IField {
  question: string
  flip?: boolean
  value?: number
}

export type IForm = IField[]

export type ITab = {
  name: string
  questions?: IForm
}

export type User = {
  id: string,
  email: string,
  token: string,
  displayName: string
}

export type UserData = {
  // arbitrary user data you are storing in your DB
}