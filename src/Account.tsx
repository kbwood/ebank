import React from 'react'
import { useLoaderData } from 'react-router-dom'
import AccountIcon from './AccountIcon'
import { accounts, BSB, typeCredit } from './Data'
import StatementSummary from './StatementSummary'
import Transaction from './Transaction'
import { Account as Acct } from './Types'
import { formatCurrency } from './Utils'
import * as TS from './Transaction.styles'
import * as S from './Account.styles'


type Data = {
  account: Acct,
}

const loader = async ({ params }: any): Promise<Data> => ({ account: accounts[params.acct] })

const group = /(\w{4})/g

const Account = () => {
  const { account } = useLoaderData() as Data
  const printStatement = () => { window.print() }
  let balance = account.balance
  return (
    <S.Account>
      <S.Heading>Account transactions</S.Heading>
      <StatementSummary />
      <S.Details>
        <S.Icon><AccountIcon account={account} /></S.Icon>
        <S.Name>
          {account.name}
          {account.type === typeCredit ?
            <S.ID>
              <S.NoPrint>Card ending: {account.number.substring(account.number.length - 3)}</S.NoPrint>
              <S.PrintOnly>{account.number.replaceAll(group, '$1 ')}</S.PrintOnly>
            </S.ID> :
            <S.ID>BSB: {BSB}&nbsp;&nbsp;&nbsp;&nbsp;Acct: {account.number}</S.ID>
          }
        </S.Name>
        <S.Balance>
          {formatCurrency(account.balance, true)}<br />
          {account.type === typeCredit && `Available: ${formatCurrency(account.available, true)}`}<br />
          <S.Print onClick={printStatement}>Print statement</S.Print>
        </S.Balance>
      </S.Details>
      <S.Transactions>
        <TS.Transaction>
          <TS.Date>Date</TS.Date>
          <TS.Title>Details</TS.Title>
          <TS.Debit>Debit</TS.Debit>
          <TS.Credit>Credit</TS.Credit>
          <TS.Balance>Balance</TS.Balance>
        </TS.Transaction>
        <S.TransactionsList>
          {account.items.map(txn => {
            const entry = <Transaction key={`${txn.date}${txn.title}${txn.reference}`} balance={balance} transaction={txn} />
            balance = Math.round((balance - txn.amount) * 100) / 100
            return entry
          })}
          <TS.Transaction>
            <TS.Date></TS.Date>
            <TS.Title>Opening balance</TS.Title>
            <TS.Debit></TS.Debit>
            <TS.Credit></TS.Credit>
            <TS.Balance>{balance}</TS.Balance>
          </TS.Transaction>
        </S.TransactionsList>
      </S.Transactions>
    </S.Account>
  )
}

export default Account
export { loader }
