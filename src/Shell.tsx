import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import { user } from './Data'
import Logo from './Logo'
import Menu from './Menu'
import { Colour } from './Styles'
import { User } from './Types'
import * as S from './Shell.styles'

type Data = {
  user: User,
}

const loader = async (): Promise<Data> => ({ user })

const Shell = () => {
  const { user } = useLoaderData() as Data
  return (
    <>
      <S.Header>
        <Logo foreground={Colour.primaryBG} />
        <Menu user={user} />
      </S.Header>
      <S.Body>
        <Outlet />
      </S.Body>
      <S.Footer>
        <span>This site is for training purposes only</span>
        <span>&copy; CPHills 2024</span>
      </S.Footer>
    </>
  )
}

export default Shell
export { loader }
