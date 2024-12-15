import { Account, Biller, DateOpt, Pay, Payment, Transaction, User } from './Types'

const addDays = (offset: number) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return date
}

const makeTxn = (daysAgo: number, title: string, reference: string, amount: number) =>
  ({ amount, date: addDays(daysAgo), reference, title }) as Transaction


export const rootPath = window.location.pathname.includes('ebank') ? '/ebank/' : '/'
export const user: User = { name: '' }

export const BSB = '099-099'
export const typeCredit = 'credit'
export const typeSave = 'save'
export const typeSpend = 'spend'

export const creditAcct: Account = {
  available: 1765.44,
  balance: -234.56,
  items: [
    makeTxn(-2, 'Local club', '', -24.24),
    makeTxn(-2, 'Transport', '', -20.00),
    makeTxn(-5, 'Fuel', '', -86.73),
    makeTxn(-8, 'Payment', 'From statement', 520.00),
    makeTxn(-15, 'Fuel', '', -92.39),
    makeTxn(-32, 'Rates', '', -354.00),
    makeTxn(-33, 'Cinema', '', -46.00),
  ],
  name: 'Credit card',
  number: '4012888888881881',
  type: typeCredit,
}

export const saveAcct: Account = {
  available: 6543.21,
  balance: 6543.21,
  items: [
    makeTxn(-7, 'Saving', 'Holiday', 250.00),
  ],
  name: 'Saver',
  number: '129449354',
  type: typeSave,
}

export const spendAcct: Account = {
  available: 2345.67,
  balance: 2345.67,
  items: [
    makeTxn(-7, 'Saving', 'Holiday', -250.00),
    makeTxn(-7, 'Interest', '', 0.01),
    makeTxn(-7, 'Salary', 'Last month', 1520.00),
    makeTxn(-8, 'Credit payment', 'From statement', -520.00),
  ],
  name: 'Everyday',
  number: '784604832',
  type: typeSpend,
}

export const accounts: Account[] = [spendAcct, saveAcct, creditAcct]

export const loggedIn = false

export const payment: Payment = {
  acctFrom: '',
  acctTo: '',
  amount: 0,
  date: '',
  dateOpt: DateOpt.today,
  description: '',
  index: undefined,
  pay: undefined,
  repeat: '',
}

export const newPay: Pay = { acct: '', bpay: '', bsb:'', name: '', payId: '' }

export const billers: Biller[] = [
  { code: '150821', name: 'RED ENERGY' },
  { code: '2006', name: 'AGL RETAIL ENERGY LIMITED' },
  { code: '23796', name: 'TELSTRA' },
  { code: '314534', name: 'ORIGIN ENERGY' },
  { code: '346197', name: 'NRMA INSURANCE' },
  { code: '4374', name: 'THE HILLS SHIRE COUNCIL' },
  { code: '45435', name: 'SYDNEY WATER' },
  { code: '655902', name: 'AAI LIMITED T/A AAMI' },
  { code: '959197', name: 'OPTUS BILLING SERVICES' },
]

const isoDate = (date: Date) => date.toISOString().split('T')[0]

export const scheduled: Payment[] = [
  {
    acctFrom: spendAcct.number,
    acctTo: saveAcct.number,
    amount: 100,
    date: '2024-08-01',
    dateOpt: DateOpt.repeat,
    description: 'Transfer to Save',
    pay: undefined,
    repeat: 'monthly',
  },
  {
    acctFrom: spendAcct.number,
    acctTo: creditAcct.number,
    amount: 1000,
    date: isoDate(addDays(15)),
    dateOpt: DateOpt.sched,
    description: 'Transfer to Credit',
    pay: undefined,
    repeat: '',
  },
  {
    acctFrom: creditAcct.number,
    acctTo: undefined,
    amount: 345,
    date: isoDate(addDays(7)),
    dateOpt: DateOpt.sched,
    description: '8743672',
    pay: { ...newPay, bpay: billers[0].code, name: billers[0].name },
    repeat: '',
  },
]
