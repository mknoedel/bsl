import { UrlObject } from "url";

export type User = {
  id: number
  name: string
}

declare type Url = UrlObject | string;

export interface IField {
  name: string
  flip?: boolean
  value?: number
}

export type IForm = IField[]

export type ITab = {
  name: string
  link: Url
  optional?: boolean
  form?: IForm
}

// xa is the access token, which can be retrieved through
// firebase.auth().currentUser.getIdToken()
export type UserData = {
  id: string,
  email: string,
  token: string,
  displayName: string
}