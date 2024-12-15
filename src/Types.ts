export type User = {
  name: string,
}

export enum DateOpt {
  today = 'today',
  sched = 'sched',
  repeat = 'repeat',
}

export type Transaction = {
  amount: number,
  date: Date,
  reference: string,
  title: string,
}

export type Account = {
  available: number,
  balance: number,
  items: Transaction[],
  name: string,
  number: string,
  type: string,
}

export type Pay = {
  acct: string,
  bpay: string,
  bsb: string,
  name: string,
  payId: string,
  [index: string]: string,
}

export type Payment = {
  acctFrom: string,
  acctTo?: string,
  amount: number,
  date: string,
  dateOpt: keyof typeof DateOpt,
  description: string,
  index?: number,
  pay?: Pay,
  repeat: string,
}

export type Biller = {
  code: string,
  name: string,
}
