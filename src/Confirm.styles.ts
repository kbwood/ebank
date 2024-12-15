import styled from 'styled-components'
import { Colour, Font } from './Styles'

export const Confirm = styled.form`
  font-size: ${Font.large};
  margin: 0 auto;
  max-width: 400px;
  width: 100%;

  > * {
    display: block;
    width: 100%;
  }
`

export const Heading = styled.h1``

export const Warning = styled.p`
  font-size: ${Font.medium};
  margin-left: -20%;
  max-width: calc(100vw - 4em);
  padding-left: 2.5em;
  position: relative;
  width: 140%;

  &::before {
    color: ${Colour.warning};
    content: '\u26a0';
    font-size: 2em;
    left: 0;
    line-height: 1em;
    position: absolute;
    top: 0;
  }
`

export const Label = styled.label`
  margin: 1em 0 0.5em;
`

export const Value = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  font-size: ${Font.medium};
  padding: 0.25em;
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
`

export const Action = styled.button`
  display: inline;
  margin: 0;
`
