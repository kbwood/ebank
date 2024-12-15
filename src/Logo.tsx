import React from 'react'
import * as S from './Logo.styles'

type LogoOpts = {
  background?: string,
  foreground?: string,
}

const Logo = ({ background = 'transparent', foreground = 'black' }: LogoOpts) => {
  return (
    <S.Logo $background={background} $foreground={foreground}>
      <S.E>E</S.E>
	    <S.X>xample</S.X>
      <S.B>Bank</S.B>
    </S.Logo>
  )
}

export default Logo
