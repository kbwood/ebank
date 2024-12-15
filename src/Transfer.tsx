import React, { ChangeEvent, FormEvent, MouseEvent as ReactMouseEvent, useState } from 'react'
import { ActionFunctionArgs, Form, redirect, useLoaderData } from 'react-router-dom'
import { payment } from './Data'
import PayCommon, { validate, type Validate } from './PayCommon'
import SelectAcct from './SelectAcct'
import { Payment } from './Types'
import { clearPayment, getAcct, url } from './Utils'
import * as S from './PayCommon.styles'

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

const Transfer = () => {
  const { payment } = useLoaderData() as Data
  const [details, setDetails] = useState<Payment>({ ...payment })
  const [transFrom, setTransFrom] = useState(getAcct(details.acctFrom || '')?.number || '')
  const [transTo, setTransTo] = useState(getAcct(details.acctTo || '')?.number || '')
  let submitter: HTMLButtonElement | null = null
  const changeFrom = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target
    setTransFrom(select.options[select.selectedIndex].value)
    setTransTo('')
  }
  const changeTo = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target
    setTransTo(select.options[select.selectedIndex].value)
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
    const error: Validate | undefined = validate(details, acctFrom?.available || 0)
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
    payment.acctTo = transTo
    payment.amount = details.amount
    payment.date = details.date
    payment.dateOpt = details.dateOpt
    payment.description = details.description
    payment.pay = undefined
    payment.repeat = details.repeat
  }
  return (
    <S.Form as={Form} method="post" onSubmit={submitTransfer}>
      <S.Heading>Transfer</S.Heading>
      <SelectAcct changeAcct={changeFrom} current={transFrom} label="From" showAvailable />
      <SelectAcct changeAcct={changeTo} current={transTo} exclude={transFrom} label="To" />
      <PayCommon forTransfer onChange={updateDetails} payment={details} />
      <S.Actions>
        <input name="index" type="hidden" value={payment.index} />
        <S.Action className="secondary" formNoValidate name="action" onClick={whichSubmitted} type="submit" value="accounts">Cancel</S.Action>
        <S.Action name="action" onClick={whichSubmitted} type="submit" value="confirm">Transfer</S.Action>
      </S.Actions>
    </S.Form>
  )
}

export default Transfer
export { action, loader }
