import styled from 'styled-components'
import { Font } from './Styles'

export const Account = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 1em 0;
  width: 100%;
`

export const Icon = styled.div`
  width: 4em;
  > svg {
    height: 2em;
    width: 2em;
  }
`

export const Name = styled.div`
  flex-grow: 1;
`

export const ID = styled.span`
  font-size: ${Font.medium};
`

export const Amount = styled.div`
  text-align: end;
  width: 6em;
`
