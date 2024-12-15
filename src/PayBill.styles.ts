import styled from 'styled-components'
import { Font } from './Styles'

export const PayBill = styled.div`
  min-height: 48px;
  position: relative;
`

export const Logo = styled.div`
  height: 48px;
  right: 0;
  position: absolute;
  top: -0.5em;
`

export const Billers = styled.select`
  font-size: ${Font.medium};
  left: 0;
  position: absolute;
  top: 2em;
  && {
    display: none;
  }
`

export const Biller = styled.option`
  padding: 0.25em;
`

export const FindBiller = styled.div`
  position: relative;

  &:focus-within {
    ${Billers} {
      display: block;
    }
  }
`
