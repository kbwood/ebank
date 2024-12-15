import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Account from './AccountItem'
import { accounts } from './Data'
import { Account as Acct } from './Types'
import { formatCurrency } from './Utils'
import * as AS from './AccountItem.styles'
import * as S from './Accounts.styles'

type Data = {
  accounts: Acct[],
}

const loader = async (): Promise<Data> => ({ accounts })

const Accounts = () => {
  const { accounts } = useLoaderData() as Data
  let total = 0
  return (
    <S.Accounts>
      <S.Heading>Accounts</S.Heading>
      <AS.Account>
        <AS.Icon>Type</AS.Icon>
        <AS.Name>Name</AS.Name>
        <AS.Amount>Balance</AS.Amount>
        <AS.Amount>Available</AS.Amount>
      </AS.Account>
      {accounts.map((acct, i) => {
        total += acct.balance
        return <Account key={acct.name} account={acct} index={i} />
      })}
      <AS.Account>
        <AS.Icon>&nbsp;</AS.Icon>
        <AS.Name>Nett position</AS.Name>
        <AS.Amount>{formatCurrency(total)}</AS.Amount>
        <AS.Amount>&nbsp;</AS.Amount>
      </AS.Account>
    </S.Accounts>
  )
}

export default Accounts
export { loader }
