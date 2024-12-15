import React from 'react'
import { useRouteError } from 'react-router-dom'
import * as S from './Error.styles'

const ErrorPage = () => {
  const error = useRouteError() as any
  console.error(error)

  return (
      <S.Page id="error-page">
        <S.Heading>Oops!</S.Heading>
        <S.Message>Sorry, an unexpected error has occurred.</S.Message>
        <S.Message>
          <i>{error.statusText || error.message}</i>
        </S.Message>
      </S.Page>
  )
}

export default ErrorPage
