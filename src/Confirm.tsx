import React from 'react'
import { ActionFunctionArgs, Form, redirect, useLoaderData } from 'react-router-dom'
import { payment, scheduled } from './Data'
import { Payment } from './Types'
import { clearPayment, dateFmt, formatCurrency, getAcct, url } from './Utils'
import * as S from './Confirm.styles'

type Data = {
  payment: Payment,
}

const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData() as any
  let action = data.get('action')
  if (action === 'accounts') {
    if (payment.date === '') {
      const transFrom = getAcct(payment.acctFrom)
      const transTo = getAcct(payment.acctTo || '')
      if (transFrom) {
        transFrom.items.unshift({
          amount: -payment.amount,
          date: new Date(),
          reference: payment.description,
          title: payment.pay?.name || `Transfer to ${transTo?.name || ''}`
        })
        transFrom.balance -= payment.amount
      }
      if (transTo) {
        transTo.items.unshift({
          amount: payment.amount,
          date: new Date(),
          reference: payment.description,
          title: payment.pay?.name || `Transfer from ${transFrom?.name || ''}`
        })
        transTo.balance += payment.amount
      }
    }
    else {
      action = 'scheduled'
      if (payment.index !== undefined) {
        scheduled[payment.index] = { ...payment, index: undefined }
      }
      else {
        scheduled.push({ ...payment })      
      }
    }
    clearPayment()
  }
  return redirect(url(action))
}

const loader = async (): Promise<Data> => ({ payment })

const Confirm = () => {
  const { payment } = useLoaderData() as Data
  const transFrom = getAcct(payment.acctFrom)
  const transTo = getAcct(payment.acctTo || '')
  return (
    <S.Confirm as={Form} method="post">
      <S.Heading>Confirm {transTo ? 'transfer' : 'payment'}</S.Heading>
      {payment.pay?.bsb && <S.Warning>Make sure all the payment details are correct. If these details aren't correct, your money will be paid to the wrong account and you may lose your funds.</S.Warning>}
      <S.Label>From</S.Label>
      <S.Value>{transFrom?.name}</S.Value>
      {transTo &&
        <>
          <S.Label>To</S.Label>
          <S.Value>{transTo?.name}</S.Value>
        </>
      }
      {payment.pay &&
        <>
          <S.Label>To</S.Label>
          <S.Value>
            {payment.pay.name}<br />
            {payment.pay.bpay ? `BPAY: ${payment.pay.bpay}` : ''}
            {payment.pay.payId ? `PayID: ${payment.pay.payId}` : ''}
            {payment.pay.bsb ? `BSB: ${payment.pay.bsb}` : ''}
            &nbsp;&nbsp;&nbsp;{payment.pay.acct ? `Acct: ${payment.pay.acct}` : ''}
          </S.Value>
        </>
      }
      <S.Label>Amount</S.Label>
      <S.Value>{formatCurrency(payment.amount)}</S.Value>
      <S.Label>{transTo ? 'Description' : 'Reference'}</S.Label>
      <S.Value>{payment.description}&nbsp;</S.Value>
      {payment.repeat &&
        <>
          <S.Label>Repeat</S.Label>
          <S.Value style={{ textTransform: 'capitalize'}}>{`${payment.repeat}`}</S.Value>
        </>
      }
      <S.Label>{payment.repeat ? 'Starting from' : 'Date'}</S.Label>
      <S.Value>{payment.date ? dateFmt.format(new Date(payment.date)) : 'Today'}</S.Value>
      <S.Actions>
        <S.Action className="secondary" name="action" type="submit" value={transTo ? 'transfer' : 'pay'}>Back</S.Action>
        <S.Action name="action" type="submit" value="accounts">Confirm</S.Action>
      </S.Actions>
    </S.Confirm>
  )
}

export default Confirm
export { action, loader }
