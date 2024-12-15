import React from 'react'
import { typeCredit, typeSave, typeSpend } from './Data'
import { CreditIcon, SaveIcon, SpendIcon } from './Icons'
import { Account as Acct } from './Types'

type Props = {
  account: Acct,
}

const AccountIcon = ({ account }: Props) => {
  switch (account.type) {
    case typeCredit: return <CreditIcon />
    case typeSave:   return <SaveIcon />
    case typeSpend:  return <SpendIcon />
    default:         return null
  }
}

export default AccountIcon
