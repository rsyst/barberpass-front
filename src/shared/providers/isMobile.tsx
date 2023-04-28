import React, { useContext, createContext, useState, useEffect } from 'react'

interface iMobile {
  openMenu: boolean
  setOpenMenu(item: boolean): void
  isMobile: boolean
}

export const MobileContext = createContext({} as iMobile)

export const useMobileContext = () => useContext(MobileContext)

export const MobileProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [openMenu, setOpenMenu] = useState<boolean>(true)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handler()

    window.addEventListener('resize', handler)
  })

  return (
    <MobileContext.Provider
      value={{
        openMenu,
        setOpenMenu,
        isMobile
      }}
    >
      {children}
    </MobileContext.Provider>
  )
}
