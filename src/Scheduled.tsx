import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { payment, scheduled } from './Data'
import { DeleteIcon, EditIcon } from './Icons'
import SchedItem from './SchedItem'
import { Payment } from './Types'
import { getAcct, url } from './Utils'
import * as SS from './SchedItem.styles'
import * as S from './Scheduled.styles'

type Data = {
  scheduled: Payment[],
}

const loader = async (): Promise<Data> => ({ scheduled })

const payee = (payment: Payment) => {
  if (payment.acctTo) {
    const transTo = getAcct(payment.acctTo)
    return transTo?.name || '?'
  }
  if (payment.pay) {
    return payment.pay.name
  }
  return '?'
}

const Scheduled = () => {
  const { scheduled } = useLoaderData() as Data
  const navigate = useNavigate()
  const deletePayment = (index: number) => {
    const payment = scheduled[index]
    if (window.confirm(`Delete payment to ${payee(payment)} ${payment.repeat ? `${payment.repeat} from` : 'on'} ${payment.date}?`)) {
      scheduled.splice(index, 1)
      navigate(url('scheduled'))
    }
  }
  const editPayment = (index: number) => {
    const pymnt = scheduled[index]
    payment.acctFrom = pymnt.acctFrom
    payment.acctTo = pymnt.acctTo
    payment.amount = pymnt.amount
    payment.date = pymnt.date
    payment.dateOpt = pymnt.dateOpt
    payment.description = pymnt.description
    payment.index = index
    payment.pay = pymnt.pay
    payment.repeat = pymnt.repeat
    navigate(url(payment.acctTo ? 'transfer' : 'pay'))
  }
  return (
    <S.Scheduled>
      <S.Heading>Scheduled payments</S.Heading>
      <SS.Sched>
        <SS.From>From</SS.From>
        <SS.To>To</SS.To>
        <SS.Amount>Amount</SS.Amount>
        <SS.Repeat>Repeat</SS.Repeat>
        <SS.Date>Next Date</SS.Date>
        <SS.Actions>Actions</SS.Actions>
      </SS.Sched>
      {scheduled.map((sched, i) => (
        <SchedItem key={`${sched.acctFrom}${sched.repeat}${sched.date}`} payment={sched}>
          <SS.Action className="secondary" onClick={() => { editPayment(i) }} title="Edit payment" type="button"><EditIcon /></SS.Action>
          <SS.Action className="secondary" onClick={() => { deletePayment(i) }} title="Delete payment" type="button"><DeleteIcon /></SS.Action>
        </SchedItem>
      ))}
    </S.Scheduled>
  )
}

export default Scheduled
export { loader }
