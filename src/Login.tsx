import React from 'react'
import { ActionFunctionArgs, Form, redirect } from 'react-router-dom'
import { user } from './Data'
import { url } from './Utils'
import * as S from './Login.styles'

const action = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData() as any
  user.name = data.get('user')
  return redirect(url('accounts'))
}

const Login = () => {
  return (
    <>
      <S.Heading>Welcome to EBank</S.Heading>
      <S.Form as={Form} method="post">
        <S.Label htmlFor="id">ID</S.Label>
        <S.Input id="id" name="user" required type="text" />
        <S.Label htmlFor="pwd">Password</S.Label>
        <S.Input id="pwd" required type="password" />
        <S.Button type="submit">Login</S.Button>
      </S.Form>
      <S.Warning className='warning'>Don't use your real details!</S.Warning>
    </>
  )
}

export default Login
export { action }
