import { useContext, createContext } from 'react'
import { iEmployesControllerResponse } from '@shared/service/EmployesController'

interface iUser {
  user: iEmployesControllerResponse
  handleSetUser: (user: iEmployesControllerResponse) => void
}

export const UserContext = createContext({} as iUser)

export const useUserContext = () => useContext(UserContext)

export const UserProvider = () => {
  // const { auth } = useAuth()
  // const { data: users = [] } = useQueryEmployesController({ enabled: !!auth?.company?.id })
  // const [user, setUser] = useState<iEmployesControllerResponse>({} as iEmployesControllerResponse)
  // const handleSetUser = (user: iEmployesControllerResponse) => {
  //   setUser(user)
  //   localStorage.setItem('user', user.name)
  // }
  // useEffect(() => {
  //   const userLocal = localStorage.getItem('user')
  //   if (userLocal) {
  //     const currentUser = users?.find((u) => u.name === userLocal) || users[0]
  //     setUser(currentUser)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [users])
  // return (
  //   <UserContext.Provider
  //     value={{
  //       user,
  //       handleSetUser
  //     }}
  //   >
  //     {children}
  //   </UserContext.Provider>
  // )
}
