import { accounts, newPay, payment, rootPath } from './Data'
import { Account as Acct, DateOpt } from './Types'

export const clearPayment = (toPay = false) => {
  payment.acctFrom = ''
  payment.acctTo = ''
  payment.amount = 0
  payment.date = ''
  payment.dateOpt = DateOpt.today
  payment.description = ''
  payment.index = undefined
  payment.pay = toPay ? { ...newPay } : undefined
  payment.repeat = ''
}

export const currencyFmt = Intl.NumberFormat('en-AU', { currency: 'AUD', style: 'currency' })

export const dateFmt = Intl.DateTimeFormat('en-AU')

export const formatCurrency = (value: number, withDollar: boolean = false) => currencyFmt.format(value).replace('$', withDollar ? '$' : '')

export const getAcct = (number: string): Acct | undefined => accounts.find(acct => acct.number === number)

export const url = (path: string) => `${rootPath}${path}`
