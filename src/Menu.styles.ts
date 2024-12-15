import styled from 'styled-components'
import { Colour, Font, noPrint } from './Styles'

export const Menu = styled.ul`
  box-sizing: border-box;
  display: flex;
  font-size: ${Font.large};
  margin: 0;
  padding: 0.75em;
  width: 100%;
  ${noPrint}
`

export const MenuItem = styled.li`
  display: block;
  flex-basis: 1em;
  flex-grow: 1;
  padding: 0 2em;

  a {
    color: ${Colour.primaryBG};
    padding: 0.25em;
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid ${Colour.primaryBG};
    }
  }
  a.active {
    background-color: ${Colour.primaryBG};
    border-radius: 4px;
    color: ${Colour.primaryFG};

    &:hover {
      border-bottom: none;
    }
  }
  a.pending {
    border-bottom: 2px solid ${Colour.primaryBG};
  }
`
