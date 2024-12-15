import styled from 'styled-components'
import { Colour, Font } from './Styles'

export const Form = styled.form`
  font-size: ${Font.large};
  margin: 0 auto;
  max-width: 400px;
  width: 100%;

  input, label, select {
    display: block;
    width: 100%;
  }
`

export const Heading = styled.h1``

export const Label = styled.label`
  margin: 1em 0 0.5em;
  
  &:has(input[type="radio"]) {
    margin-right: 1em;
    padding: 0.25em;
  }

  &:has(input[type="radio"]:focus) {
    outline: 2px solid black;
  }

  &:has(input[type="radio"]:checked) {
    background-color: ${Colour.primaryBG};
    border-radius: 4px;
    color: ${Colour.primaryFG};
  }
`

export const Select = styled.select`
  border-radius: 4px;
  font-size: ${Font.medium};
  padding: 0.25em;
`

export const Option = styled.option`
  display: flex;
  justify-content: space-between;
`

export const Input = styled.input`
  border-radius: 4px;
  font-size: ${Font.medium};
  padding: 0.25em;
`

export const RadioGroup = styled.div`
  input, label {
    display: inline-block;
    width: auto;
  }
  label {
    margin: 0;
  }
`

export const Radio = styled.input`
  ${RadioGroup} & {
    margin: 0;
    outline: none;
    width: 1px;
  }
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
