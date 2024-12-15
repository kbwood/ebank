import React from 'react'
import { Link } from 'react-router-dom'
import AccountIcon from './AccountIcon'
import { BSB, typeCredit } from './Data'
import { Account as Acct } from './Types'
import { url } from './Utils'
import * as S from './AccountItem.styles'

type Props = {
  account: Acct,
  index: number,
}

const Account = ({ account, index }: Props) => {
  return (
    <S.Account>
      <S.Icon><AccountIcon account={account} /></S.Icon>
      <S.Name>
        <Link to={url(`account/${index}`)}>{account.name}</Link><br />
        {account.type === typeCredit ?
          <S.ID>Card ending: {account.number.substring(account.number.length - 3)}</S.ID> :
          <S.ID>BSB: {BSB}&nbsp;&nbsp;&nbsp;&nbsp;Acct: {account.number}</S.ID>
        }
      </S.Name>
      <S.Amount>{account.balance}</S.Amount>
      <S.Amount>{account.available}</S.Amount>
    </S.Account>
  )
}

export default Account
