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

export type Scores = {
  name: string
  rating: number
}

export type SnackSeverity =
	| 'error'
	| 'success'
	| 'warning'
    | 'info'

export interface SnackMessage {
    message: string
    key?: number
    type?: SnackSeverity
}
      
export interface SnackState {
    open: boolean;
    snackPack: SnackMessage[];
    messageInfo?: SnackMessage;
}

export type SnackType = 'push' | 'pop' | 'close' | 'set_message'
export type SnackAction = {type: SnackType, payload?: any}
