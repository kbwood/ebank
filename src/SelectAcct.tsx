import React, { ChangeEvent } from 'react'
import { accounts } from './Data'
import { formatCurrency } from './Utils'
import * as S from './PayCommon.styles'

type Props = {
  changeAcct: (event: ChangeEvent<HTMLSelectElement>) => void,
  current: string,
  exclude?: string,
  label: string,
  showAvailable?: boolean,
}

const enSpace = '\u2002'

const normalise = (value: string) => value.toLowerCase().replaceAll(/\W/g, '')

const SelectAcct = ({ changeAcct, current, exclude, label, showAvailable: showBalance }: Props) => {
  const id = normalise(label)
  const maxlen = Math.max(...accounts.map(({ name }) => name.length))
  return (
    <>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.Select id={id} required value={current} onChange={changeAcct}>
        <S.Option value="">Select account</S.Option>
        {accounts.map(acct => acct.number === exclude ? null : (
          <S.Option key={acct.number} value={acct.number}>
            {acct.name.padEnd(maxlen + 1, enSpace)}
            {showBalance ? formatCurrency(acct.available) : ''}
          </S.Option>)
        )}
      </S.Select>
    </>
  )
}

export default SelectAcct
