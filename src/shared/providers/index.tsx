import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import React from 'react'
import { AuthProvider } from './auth'
import { MobileProvider } from './isMobile'
import { UserProvider } from './user'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const themeConfig = {
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac'
    }
  },

  breakpoints: {
    base: '0em',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px'
  },

  shadows: {
    green: ' 0 0 10px 0px #22c35e',
    gray: ' 0 0 10px 0px #718096'
  }
}

export const theme = extendTheme(themeConfig)

function Providers({ children }: React.PropsWithChildren<unknown>) {
  return (
    <MobileProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <UserProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              {children}
            </UserProvider>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </MobileProvider>
  )
}

export default Providers
