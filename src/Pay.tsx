import React, { ChangeEvent, FormEvent, MouseEvent as ReactMouseEvent, useState } from 'react'
import { ActionFunctionArgs, Form, redirect, useLoaderData } from 'react-router-dom'
import PayAcct from './PayAcct'
import PayBill, { validate as validatePayBill } from './PayBill'
import PayID, { validate as validatePayID } from './PayID'
import { newPay, payment } from './Data'
import PayCommon, { validate, type Validate } from './PayCommon'
import SelectAcct from './SelectAcct'
import { Payment } from './Types'
import { clearPayment, getAcct, url } from './Utils'
import * as PS from './PayCommon.styles'

type Data = {
  payment: Payment,
}

const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData() as any
  let action = data.get('action')
  if (action === 'accounts') {
    if (data.get('index') !== '') {
      action = 'scheduled'
    }
    clearPayment()
  }
  return redirect(url(action))
}

const loader = async (): Promise<Data> => ({ payment })

const Pay = () => {
  const { payment } = useLoaderData() as Data
  const [details, setDetails] = useState<Payment>({ ...payment, acctTo: undefined, pay: payment.pay || { ...newPay } })
  const [transFrom, setTransFrom] = useState(getAcct(payment.acctFrom || '')?.number || '')
  const [payType, setPayType] = useState(!!details.pay?.bpay ? 'bill' : !!details.pay?.payId ? 'payid' : 'acct' )
  let submitter: HTMLButtonElement | null = null
  const changeFrom = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target
    setTransFrom(select.options[select.selectedIndex].value)
  }
  const changePayType = (event: ChangeEvent<HTMLInputElement>) => {
    setPayType(event.target.value)
  }
  const whichSubmitted = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
    submitter = event.target as HTMLButtonElement
  }
  const updateDetails = (details: Payment) => {
    setDetails(details)
  }
  const submitTransfer = (event: FormEvent) => {
    if (submitter?.value !== 'confirm') {
      return
    }
    const acctFrom = getAcct(transFrom)
    const error: Validate | undefined = validate(details, acctFrom?.available || 0) ||
      validatePayID(details) || validatePayBill(details)
    if (error) {
      if (error.alert) {
        window.alert(error.alert)
        event.preventDefault()
      }
      else if (!window.confirm(error.confirm)) {
        event.preventDefault()
      }
      return
    }
    payment.acctFrom = transFrom
    payment.amount = details.amount
    payment.date = details.date
    payment.dateOpt = details.dateOpt
    payment.description = details.description
    payment.pay = details.pay ? { ...details.pay } : undefined
    payment.repeat = details.repeat
  }
  return (
    <PS.Form as={Form} method="post" onSubmit={submitTransfer}>
      <PS.Heading>Pay</PS.Heading>
      <SelectAcct changeAcct={changeFrom} current={transFrom} label="From" showAvailable />
      <PS.Label>Pay</PS.Label>
      <PS.RadioGroup>
        <PS.Label>
          <PS.Radio checked={payType === 'acct'} name="payType" type="radio" value="acct" onChange={changePayType} />
          BSB &amp; Acct
        </PS.Label>
        <PS.Label>
          <PS.Radio checked={payType === 'payid'} name="payType" type="radio" value="payid" onChange={changePayType} />
          PayID
        </PS.Label>
        <PS.Label>
          <PS.Radio checked={payType === 'bill'} name="payType" type="radio" value="bill" onChange={changePayType} />
          Bill
        </PS.Label>
      </PS.RadioGroup>
      <div>
        {payType === 'bill' ? 
          <PayBill onChange={updateDetails} payment={details} /> :
          payType === 'payid' ?
          <PayID onChange={updateDetails} payment={details} /> :
          <PayAcct onChange={updateDetails} payment={details} />
        }
      </div>
      <PayCommon payment={details} onChange={updateDetails} />
      <PS.Actions>
        <input name="index" type="hidden" value={payment.index} />
        <PS.Action className="secondary" formNoValidate name="action" onClick={whichSubmitted} type="submit" value="accounts">Cancel</PS.Action>
        <PS.Action name="action" onClick={whichSubmitted} type="submit" value="confirm">Pay</PS.Action>
      </PS.Actions>
    </PS.Form>
  )
}

export default Pay
export { action, loader }
