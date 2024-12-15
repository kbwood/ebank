import styled from 'styled-components'
import { Font, printOnly } from './Styles'

export const Summary = styled.div`
  display: none;
  font-size: ${Font.normal};
  position: relative;
  ${printOnly`
    display: block;
  `}
`

export const Account = styled.p`
  display: none;
  font-size: ${Font.large};
  font-weight: bold;
  left: 0;
  position: absolute;
  text-align: right;
  top: -3em;
  width: 100%;
  z-index: 20;
  ${printOnly`
    display: block;
  `}
`

export const Details = styled.div`
  display: flex;
  justify-content: space-between;
  > * {
    width: 40%;
  }
  table {
    width: 100%;
  }
  th {
    font-weight: normal;
    text-align: left;
  }
  td {
    text-align: right;
  }
  tr:last-child {
    font-weight: bold;
    th {
      font-weight: bold;
    }
  }
`

export const Period = styled.p`
  font-weight: bold;
`

export const Payment = styled.div`
  display: flex;
  justify-content: space-between;
  > * {
    width: 40%;
  }
  table:last-child {
    border: 1px solid #000;
    font-size: ${Font.medium};
    font-weight: bold;
    padding: 0.5em;
  }
  th {
    font-weight: normal;
    text-align: left;
  }
  td {
    text-align: right;
  }
`
