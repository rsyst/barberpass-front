import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import React from 'react'
import { AuthProvider } from './auth'
import { MobileProvider } from './isMobile'
import { theme } from './theme'
// import { UserProvider } from './user'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

function Providers({ children }: React.PropsWithChildren<unknown>) {
  return (
    <MobileProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            {/* <UserProvider> */}
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
            {/* </UserProvider> */}
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </MobileProvider>
  )
}

export default Providers
