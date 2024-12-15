import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Account as Acct } from './Types'
import { dateFmt, formatCurrency } from './Utils'
import * as S from './StatementSummary.styles'
import { typeCredit, typeSave, typeSpend } from './Data'


type Data = {
  account: Acct,
}

const StatementSummary = () => {
  const { account } = useLoaderData() as Data
  let type = ''
  switch (account.type) {
    case typeCredit: type = 'EBank Credit'; break;
    case typeSave:   type = 'EBank SuperSaver'; break;
    case typeSpend:  type = 'EBank Everyday'; break;
  }
  let balance = account.balance
  let credits = 0
  let debits = 0
  account.items.forEach(txn => {
    balance = Math.round((balance - txn.amount) * 100) / 100
    if (txn.amount < 0) {
      debits += txn.amount
    } else {
      credits += txn.amount
    }
  })
  const start = new Date()
  start.setDate(start.getDate() - 34)
  const end = new Date()
  end.setDate(end.getDate() - 5)
  const due = new Date()
  due.setDate(due.getDate() + 7)
  return (
    <S.Summary>
      <S.Account>{type}</S.Account>
      <S.Details>
        <p>
          <br />
          Mr John Doe<br />
          123 High St<br />
          Sydney NSW 2000
        </p>
        <div>
          <table>
            <tbody>
              <tr><th>Opening balance</th><td>{formatCurrency(balance, true)}</td></tr>
              <tr><th>Credits</th><td>+{formatCurrency(credits, true)}</td></tr>
              <tr><th>Debits</th><td>{formatCurrency(debits, true)}</td></tr>
              <tr><th>Closing balance</th><td>{formatCurrency(account.balance, true)}</td></tr>
            </tbody>
          </table>
          <S.Period>
            Statement period<br />
            {dateFmt.format(start)} to {dateFmt.format(end)}
          </S.Period>
        </div>
      </S.Details>
      {account.type === typeCredit && (
        <S.Payment>
          <table>
            <tbody>
              <tr><th>Credit limit</th><td>{formatCurrency(account.available - account.balance, true)}</td></tr>
              <tr><th>Available credit</th><td>{formatCurrency(account.available, true)}</td></tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr><th>Amount due</th><td>{formatCurrency(-account.balance, true)}</td></tr>
              <tr><th>Due date</th><td>{dateFmt.format(due)}</td></tr>
            </tbody>
          </table>
        </S.Payment>
      )}
    </S.Summary>
  )
}

export default StatementSummary
