//Crie um contexto que exporte um useLayoutContext com isOpenMenu e toggleMenu

import { useMediaQuery } from '@chakra-ui/react'
import { createContext, useContext, useEffect, useState } from 'react'

export const LayoutUserContext = createContext(
  {} as { isOpenMenu: boolean; toggleMenu: () => void; setIsOpenMenu: (value: boolean) => void }
)

export const useLayoutUserContext = () => {
  const context = useContext(LayoutUserContext)

  if (!context) {
    throw new Error('useLayoutUserContext must be used within an LayoutUserProvider')
  }

  return context
}

export const LayoutUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDesktop] = useMediaQuery('(min-width: 800px)', {
    ssr: true,
    fallback: false
  })

  const [isOpenMenu, setIsOpenMenu] = useState(isDesktop)

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  useEffect(() => {
    setIsOpenMenu(isDesktop)
  }, [isDesktop])

  return (
    <LayoutUserContext.Provider value={{ isOpenMenu, toggleMenu, setIsOpenMenu }}>
      {children}
    </LayoutUserContext.Provider>
  )
}
