import React, { ChangeEvent, useRef } from 'react'
import { DateOpt, Payment } from './Types'
import * as S from './PayCommon.styles'

type Data = {
  forTransfer?: boolean,
  onChange: (payment: Payment) => void,
  payment: Payment,
}

type Validate = {
  alert?: string,
  confirm?: string,
}

const validate = (payment: Payment, available: number): Validate | undefined => {
  if (payment.amount > available) {
    return { confirm: 'Insufficient funds in this account for this amount.\nDo you wish to continue?' }
  }
  return undefined
}

const PayCommon = ({ forTransfer = false, onChange, payment }: Data) => {
  const amountRef = useRef<HTMLInputElement>(null)
  const descrRef = useRef<HTMLInputElement>(null)
  const updateDetails = (update: Partial<Payment>) => {
    const details = { ...payment, ...update }
    details.amount = parseFloat(amountRef.current?.value || '0')
    details.description = descrRef.current?.value || ''
    onChange(details)
  }
  const changeAmountDescr = () => {
    updateDetails({})
  }
  const changeDateOpt = (event: ChangeEvent<HTMLInputElement>) => {
    updateDetails({ dateOpt: event.target.value as DateOpt, repeat: '', date: '' })
  }
  const changeRepeat = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target
    updateDetails({ repeat: select.options[select.selectedIndex].value })
  }
  const changeDate = (event: ChangeEvent<HTMLInputElement>) => {
    updateDetails({ date: event.target.value })
  }
  return (
    <>
      <S.Label htmlFor="amount">Amount</S.Label>
      <S.Input ref={amountRef} defaultValue={String(payment.amount)} id="amount" min={0.01} required step="any" type="number" onChange={changeAmountDescr} />
      <S.Label htmlFor="descr">{forTransfer ? 'Description (optional)' : 'Reference'}</S.Label>
      <S.Input ref={descrRef} defaultValue={payment.description} id="descr" onChange={changeAmountDescr} required={!forTransfer} type="text" />
      <S.Label htmlFor="when">When</S.Label>
      <S.RadioGroup>
        <S.Label>
          <S.Radio checked={payment.dateOpt === DateOpt.today} name="dateOpt" onChange={changeDateOpt} type="radio" value={DateOpt.today} />
          Today
        </S.Label>
        <S.Label>
          <S.Radio checked={payment.dateOpt === DateOpt.sched} name="dateOpt" onChange={changeDateOpt} type="radio" value={DateOpt.sched} />
          Scheduled
        </S.Label>
        <S.Label>
          <S.Radio checked={payment.dateOpt === DateOpt.repeat} name="dateOpt" onChange={changeDateOpt} type="radio" value={DateOpt.repeat} />
          Repeating
        </S.Label>
      </S.RadioGroup>
      {payment.dateOpt === DateOpt.repeat && (
        <>
          <S.Label htmlFor="repeat">Repeat</S.Label>
          <S.Select id="repeat" onChange={changeRepeat} required value={payment.repeat}>
            <S.Option value="">Select period</S.Option>
            <S.Option value="weekly">Weekly</S.Option>
            <S.Option value="fortnightly">Fortnightly</S.Option>
            <S.Option value="monthly">Monthly</S.Option>
            <S.Option value="quarterly">Quarterly</S.Option>
          </S.Select>
        </>
      )}
      {payment.dateOpt !== DateOpt.today && (
        <>
          <S.Label htmlFor="date">{payment.dateOpt === DateOpt.repeat ? 'Starting from' : 'Date'}</S.Label>
          <S.Input id="date" min={new Date().toISOString().split('T')[0]} required value={payment.date} type="date" onChange={changeDate} />
        </>
      )}
    </>
  )
}

export default PayCommon
export { validate }
export type { Validate }
