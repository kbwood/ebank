import styled from 'styled-components'
import { Colour, noPrint, printOnly } from './Styles'

export const Header = styled.header`
  background-color: white;
  border-bottom: 2px solid ${Colour.primaryBG};
  box-shadow: 0px 5px 5px 0px ${Colour.primaryBG}80;
  display: flex;
  padding-bottom: 8px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  ${printOnly`
    box-shadow: none;
    padding-left: 10%;
  `}
`

export const Body = styled.div`
  padding: 5em 10% 3em;
`

export const Footer = styled.footer`
  background-color: ${Colour.primaryBG};
  bottom: 0;
  color: ${Colour.primaryFG};
  display: flex;
  justify-content: space-between;
  padding: 0.5em 1em;
  position: fixed;
  text-align: end;
  width: 100%;
  z-index: 10;
  ${noPrint}
`
