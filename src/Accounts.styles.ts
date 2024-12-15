import styled from 'styled-components'
import { Colour, Font } from './Styles'

export const Accounts = styled.div`
  font-size: ${Font.large};
  width: 100%;

  > div:first-of-type {
    font-weight: bold;
  }

  > div:last-of-type {
    border-top: 1px solid ${Colour.primaryBG};
  }
`

export const Heading = styled.h1``
