import { createGlobalStyle } from 'styled-components'
import { Colour, Font } from './Styles'
 
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: ${Font.primaryFamily};
    margin: 0;
    padding: 0;
  }
  h1 {
    color: ${Colour.primaryBG};
  }
  button {
    background-color: ${Colour.primaryBG};
    border: 2px solid ${Colour.primaryBG};
    border-radius: 4px;
    color: ${Colour.primaryFG};
    display: block;
    font-size: ${Font.medium};
    font-weight: bold;
    margin: auto;
    padding: 0.5em;
  }
  button.secondary {
    background-color: transparent;
    border-color: ${Colour.primaryBG};
    color: ${Colour.primaryBG};

    &:focus {
      background-color: ${Colour.primaryBG}22;
    }
  }
  p.warning {
    color: ${Colour.warning};
    font-size: ${Font.normal};
    text-align: center;
  }
  input:invalid, select:invalid {
    background-color: ${Colour.warning}11;
  }
  @page {
    margin: 0;
    @bottom-center {
      content: "Page " counter(page) " of " counter(pages);
    }
  }
`
 
export default GlobalStyle
