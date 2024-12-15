import styled from 'styled-components'
import { Colour, Font } from './Styles'

export const Heading = styled.h1`
  margin: 15% auto 1em;
  text-align: center;
`

export const Form = styled.form`
  border: 2px solid ${Colour.primaryBG};
  border-radius: 4px;
  margin: 0 auto;
  max-width: 400px;
  padding: 1em;
`

export const Label = styled.label`
  display: block;
  font-family: ${Font.secondaryFamily};
  font-size: ${Font.normal};
  margin-top: 1em;
`

export const Input = styled.input`
  display: block;
  font-family: ${Font.primaryFamily};
  font-size: ${Font.large};
  margin-bottom: 1em;
  width: 100%;
`

export const Button = styled.button``

export const Warning = styled.p`
  font-weight: bold;
`
