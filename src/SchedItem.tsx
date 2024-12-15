import React, { ReactNode } from 'react'
import { Payment } from './Types'
import { dateFmt, formatCurrency, getAcct } from './Utils'
import * as S from './SchedItem.styles'

type Props = {
  children: ReactNode,
  payment: Payment,
}

const nextPayment = (repeat: string, date: string) => {
  const next = new Date(date)
  let offset = 0
  switch (repeat) {
    case 'weekly': offset = 7; break
    case 'fortnightly': offset = 14; break
    case 'monthly': offset = 30; break
    case 'quarterly': offset = 91; break
  }
  if (offset) {
    const today = new Date()
    while (next < today) {
      next.setDate(next.getDate() + offset)
    }
  }
  return dateFmt.format(next)
}

const SchedItem = ({ children, payment }: Props) => {
  const transFrom = getAcct(payment.acctFrom)
  const transTo = getAcct(payment.acctTo || '')
  return (
    <S.Sched>
      <S.From>{transFrom?.name}</S.From>
      <S.To>
        {transTo?.name || payment.pay?.name || payment.description}<br />
        {payment.pay?.bpay ? `BPay: ${payment.pay.bpay}` : ''}
        {payment.pay?.payId ? `PayID: ${payment.pay.payId}` : ''}
        {payment.pay?.bsb ? `BSB: ${payment.pay.bsb}` : ''}
        &nbsp;&nbsp;&nbsp;{payment.pay?.acct ? `Acct: ${payment.pay.acct}` : ''}
      </S.To>
      <S.Amount>{formatCurrency(payment.amount)}</S.Amount>
      <S.Repeat>{payment.repeat}</S.Repeat>
      <S.Date>{nextPayment(payment.repeat, payment.date)}</S.Date>
      <S.Actions>{children}</S.Actions>
    </S.Sched>
  )
}

export default SchedItem
