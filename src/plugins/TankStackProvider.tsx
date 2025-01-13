import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'


// Create a client
const queryClient = new QueryClient()
interface Props {
    //Tambien puede ser React.PropsWithChildren
    children : ReactNode
}
export const TankStackProvider = ({children}:Props) => {
  return (
     // Provide the client to your App
     <QueryClientProvider client={queryClient}>
     {children}
     <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  )
}
