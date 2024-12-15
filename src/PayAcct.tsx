import React, { ChangeEvent } from 'react'
import { Payment } from './Types'
import * as PS from './PayCommon.styles'
import * as S from './PayAcct.styles'

type Props = {
  onChange: (payment: Payment) => void,
  payment: Payment,
}

const PayAcct = ({ onChange, payment }: Props) => {
  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    const field = target.getAttribute('data-field') || ''
    const details = { ...payment }
    details.pay!.bpay = ''
    details.pay!.payId = ''
    details.pay![field] = target.value
    onChange(details)
  }
  return (
    <S.PayAcct>
      <PS.Label htmlFor="acctName">Name</PS.Label>
      <PS.Input data-field="name" defaultValue={payment.pay!.name} id="acctName" onChange={changeField} required type="text" />
      <PS.Label htmlFor="acctBSB">BSB</PS.Label>
      <PS.Input data-field="bsb" defaultValue={payment.pay!.bsb} id="acctBSB" onChange={changeField} pattern={"\\d{6}"} required title="Please enter six digits" type="text" />
      <PS.Label htmlFor="acctNo">Account</PS.Label>
      <PS.Input data-field="acct" defaultValue={payment.pay!.acct} id="acctNo" onChange={changeField} required type="text" />
    </S.PayAcct>
  )
}

export default PayAcct
