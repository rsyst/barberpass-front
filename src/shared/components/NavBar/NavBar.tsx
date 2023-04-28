import React from 'react'
import { useMobileContext } from 'shared/providers/isMobile'
import RstNavBarDesktop from './NavBarDesktop'
import RstNavBarMobile from './NavBarMobile'
export interface iRoutes {
  name: string
  path: string
}
const routes: iRoutes[] = [
  {
    name: 'Dashboard',
    path: '/dashboard'
  },
  {
    name: 'Perfil',
    path: '/config/user'
  }
]

const RstNavBar = () => {
  const { isMobile } = useMobileContext()

  return isMobile ? <RstNavBarMobile routes={routes} /> : <RstNavBarDesktop routes={routes} />
}

export default RstNavBar
