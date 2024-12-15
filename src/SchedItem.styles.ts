import styled from 'styled-components'

export const Sched = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 1em 0;
  width: 100%;
`

export const From = styled.div`
  flex-basis: 10%;
  flex-grow: 1;
`

export const To = styled.div`
  flex-basis: 10%;
  flex-grow: 1;
`

export const Amount = styled.div`
  margin-right: 1em;
  text-align: end;
  width: 6em;
`

export const Repeat = styled.div`
  width: 5em;
`

export const Date = styled.div`
  width: 6em;
`

export const Actions = styled.div`
  width: 5em;
`

export const Action = styled.button`
  background-color: transparent;
  display: inline;
  position: relative;
  top: -0.5em;

  + button {
    margin-left: 0.5em;
  }

  svg {
    height: 1.5em;
    width: 1.5em;
  }
`
