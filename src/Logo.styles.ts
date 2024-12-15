import styled from 'styled-components'
import { Font } from './Styles'

type LogoOpts = {
  $background: string,
  $foreground: string,
}

export const Logo = styled.div<LogoOpts>`
  background-color: ${({ $background }) => $background};
  color: ${({ $foreground }) => $foreground};
  display: block;
  font-family: ${Font.logoFamily};
  font-style: italic;
  font-weight: bold;
  height: 4em;
  position: relative;
  width: 12em;
`

export const E = styled.span`
  font-size: 4em;
  left: 0;
  position: absolute;
  top: 0;
`

export const X = styled.span`
  font-size: 1em;
  left: 3.15em;
  position: absolute;
  top: 0.5em;
`

export const B = styled.span`
  font-size: 3em;
  left: 0.85em;
  position: absolute;
  top: 0.32em;
`