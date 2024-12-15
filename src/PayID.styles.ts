import styled from 'styled-components'
import { Colour } from './Styles'
import { Value } from './PayCommon.styles'

export const PayID = styled.div``

export const Verify = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5em;

  svg {
    height: 2em;
  }
`

export const Valid = styled(Value)`
  margin-top: 0.5em;
  padding-left: 2em;
  position: relative;

  &::before {
    background-color: ${Colour.ok};
    border-radius: 50%;
    color: ${Colour.primaryFG};
    content: '\u2713';
    height: 1.25em;
    left: 0.25em;
    position: absolute;
    text-align: center;
    top: 0.25em;
    width: 1.25em;
  }
`

export const Invalid = styled(Valid)`
  &::before {
    background-color: ${Colour.warning};
    content: '\u2717';
  }
`
