import styled from 'styled-components'

export const Transaction = styled.div`
  display: flex;
  padding: 1em;
  width: 100%;
`

export const Date = styled.div`
  width: 6em;
`

export const Title = styled.div`
  flex-grow: 1;
`

export const Balance = styled.div`
  text-align: end;
  width: 6em;
`

export const Debit = Balance
export const Credit = Balance
