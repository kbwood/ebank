import React from 'react'
import { Transaction as Txn } from './Types'
import { dateFmt, formatCurrency } from './Utils'
import * as S from './Transaction.styles'

type Props = {
  balance: number,
  transaction: Txn,
}

const Transaction = ({ balance, transaction }: Props) => {
  return (
    <S.Transaction>
      <S.Date>{dateFmt.format(transaction.date)}</S.Date>
      <S.Title>
        {transaction.title}<br />
        {transaction.reference}
      </S.Title>
      <S.Debit>{transaction.amount < 0 ? formatCurrency(transaction.amount) : null}</S.Debit>
      <S.Credit>{transaction.amount >= 0 ? formatCurrency(transaction.amount) : null}</S.Credit>
      <S.Balance>{formatCurrency(balance)}</S.Balance>
    </S.Transaction>
  )
}

export default Transaction
