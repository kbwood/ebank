import React, { MouseEvent as ReactMouseEvent } from 'react'
import { NavLink, NavLinkRenderProps } from 'react-router-dom'
import { User } from './Types'
import { url } from './Utils'
import * as S from './Menu.styles'

type Props = {
  user: User,
}

const Menu = ({ user }: Props) => {
  const className = ({ isActive, isPending }: NavLinkRenderProps) => isActive ? 'active' : isPending ? 'pending' : ''
  const logOut = (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (window.confirm('Are you sure you want to log out?')) {
      user.name = ''
      return
    }
    event.preventDefault()
  }
  return (!user.name ? null :
    <S.Menu>
      <S.MenuItem><NavLink className={className} to={url('accounts')}>Accounts</NavLink></S.MenuItem>
      <S.MenuItem><NavLink className={className} to={url('transfer')}>Transfer</NavLink></S.MenuItem>
      <S.MenuItem><NavLink className={className} to={url('pay')}>Pay</NavLink></S.MenuItem>
      <S.MenuItem><NavLink className={className} to={url('scheduled')}>Scheduled</NavLink></S.MenuItem>
      <S.MenuItem><NavLink className={className} onClick={logOut} to={url('login')}>Log out</NavLink></S.MenuItem>
    </S.Menu>
  )
}

export default Menu
