import React, { ChangeEvent, useRef } from 'react'
import BPayLogo from './assets/bpay.gif'
import { billers, newPay } from './Data'
import { Validate } from './PayCommon'
import { Payment } from './Types'
import * as PS from './PayCommon.styles'
import * as S from './PayBill.styles'

type Props = {
  onChange: (payment: Payment) => void,
  payment: Payment,
}

const validate = (payment: Payment): Validate | undefined => {
  if (payment.pay?.bpay && !payment.pay!.name) {
    return { alert: 'Please select the biller' }
  }
  return undefined
}

const enSpace = '\u2002'

const PayBill = ({ onChange, payment }: Props) => {
  const codeRef = useRef<HTMLInputElement>(null)
  const findRef = useRef<HTMLDivElement>(null)
  const billersRef = useRef<HTMLSelectElement>(null)
  const changeCode = () => {
    const value = codeRef.current?.value || ''
    const options = billersRef.current?.options
    if (options) {
      for(let i = 0; i < options.length; i++) {
        options[i].style.display = options[i].value.includes(value) ? 'block' : 'none'
      }
    }
    const details = { ...payment, pay: { ...newPay, bpay: value, name: '' } }
    onChange(details)
  }
  const changeBiller = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target
    const biller = select.options[select.selectedIndex].value
    const parts = biller.split(/\s+/)
    const details = { ...payment, pay: { ...newPay, bpay: parts[0], name: parts.slice(1).join(' ') } }
    onChange(details)
  }
  return (
    <S.PayBill>
      <S.Logo as="img" alt="BPay" src={BPayLogo} />
      <PS.Label htmlFor="billerCode">Biller code</PS.Label>
      <S.FindBiller ref={findRef}>
        <PS.Input ref={codeRef} id="billerCode" required type="number" value={payment.pay?.bpay} onChange={changeCode} />
        <S.Billers ref={billersRef} size={4} onChange={changeBiller}>
          {billers.map(({ code, name }) => <S.Biller key={code}>{String(code).padEnd(6, enSpace)} {name}</S.Biller>)}
        </S.Billers>
      </S.FindBiller>
      <PS.Label>Name</PS.Label>
      <PS.Value>{payment.pay?.name}&nbsp;</PS.Value>
    </S.PayBill>
  )
}

export default PayBill
export { validate }
