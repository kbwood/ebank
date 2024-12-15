import styled from 'styled-components'
import { Colour, Font, noPrint, printOnly } from './Styles'

export const Account = styled.div`
  font-size: ${Font.large};
  width: 100%;
`
export const Heading = styled.h1`
  ${noPrint}
`

export const Summary = styled.div`
  display: none;
  ${printOnly`
    display: flex;
  `}
`

export const Details = styled.div`
  border-bottom: 1px solid ${Colour.primaryBG};
  display: flex;
  font-weight: bold;
  padding: 1em;
  width: 100%;
  ${printOnly`
    font-size: ${Font.normal};
  `}
`

export const Icon = styled.div`
  width: 4em;
  ${noPrint}

  svg {
    height: 3em;
    width: 3em;
  }
`

export const Name = styled.div`
  flex-grow: 1;
`

export const ID = styled.div`
  font-size: ${Font.medium};
  ${printOnly`
    display: inline-block;
    font-size: ${Font.normal};
    margin-left: 1em;
  `}
`

export const NoPrint = styled.span`
  ${noPrint}
`

export const PrintOnly = styled.span`
  display: none;
  ${printOnly`
    display: inline;
  `}
`

export const Balance = styled.div`
  text-align: end;
  width: 10em;
  ${noPrint}
`

export const Print = styled.button`
  margin: 0.5em 0 0 auto;
`

export const Transactions = styled.div`
  font-size: ${Font.large};
  ${printOnly`
    font-size: ${Font.normal};
  `}

  > div:first-child {
    font-weight: bold;
  }
`

export const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  ${printOnly`
    flex-direction: column-reverse;
  `}
  > div:last-child {
    display: none;
    ${printOnly`
      display: flex;
    `}
  }
`
