import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { PayIDIcon } from './Icons'
import { Validate } from './PayCommon'
import { Pay, Payment } from './Types'
import * as PS from './PayCommon.styles'
import * as S from './PayID.styles'

type Props = {
  onChange: (payment: Payment) => void,
  payment: Payment,
}
type TypeMap = {
  [index: string]: string,
}

const validate = (payment: Payment): Validate | undefined => {
  if (payment.pay?.payId && !payment.pay!.name) {
    return { alert: 'Please verify the PayID' }
  }
  return undefined
}

const inputType: TypeMap = {
  abn: 'number',
  email: 'email',
  mobile: 'number',
  org: 'text',
}

const PayID = ({ onChange, payment }: Props) => {
  const typeRef = useRef<HTMLSelectElement>(null)
  const idRef = useRef<HTMLInputElement>(null)
  const [verified, setVerified] = useState('')
  useEffect(() => {
    if (idRef.current) {
      idRef.current.type = inputType[payment.pay!.payId] || 'text'
    }
  }, [])
  const updateDetails = (updates: Partial<Pay>) => {
    const details = { ...payment, pay: { ...payment!.pay, bpay: '', bsb: '', ...updates } } as Payment
    onChange(details)
  }
  const changeType = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target
    const value = select.options[select.selectedIndex].value
    if (idRef.current) {
      idRef.current.type = inputType[value]
    }
    setVerified('')
    updateDetails({ acct: '', name: '', payId: value })
  }
  const changeID = (event: ChangeEvent<HTMLInputElement>) => {
    setVerified('')
    updateDetails({ acct: event.target.value, name: '' })
  }
  const verify = () => {
    const id = idRef.current?.value
    if (!id) {
      window.alert('Please enter the PayID')
      return
    }
    const type = typeRef.current?.value
    setVerified(type === 'org' ? 'invalid' : 'valid')
    updateDetails({ name: type === 'org' ? '' : 'JOHN CITIZEN' })
  }
  return (
    <S.PayID>
      <PS.Label htmlFor="idType">Type</PS.Label>
      <PS.Select ref={typeRef} id="idType" onChange={changeType} required value={payment.pay!.payId}>
        <PS.Option value="">Select type</PS.Option>
        <PS.Option value="mobile">Mobile</PS.Option>
        <PS.Option value="email">Email</PS.Option>
        <PS.Option value="abn">ABN/ACN</PS.Option>
        <PS.Option value="org">Org ID</PS.Option>
      </PS.Select>
      <PS.Label htmlFor="idValue">ID</PS.Label>
      <PS.Input ref={idRef} id="idValue" onChange={changeID} required type="number" value={payment.pay!.acct} />
      <S.Verify>
        <PayIDIcon />
        <PS.Action className="secondary" onClick={verify} type="button">Verify PayID</PS.Action>
      </S.Verify>
      {verified === 'valid' && (
        <S.Valid>
          PayID is registered to<br />
          JOHN CITIZEN
        </S.Valid>
      )}
      {verified === 'invalid' && (
        <S.Invalid>
          PayID not registered or not available. Check the details are correct and try again.
        </S.Invalid>
      )}
    </S.PayID>
  )
}

export default PayID
export { validate }
