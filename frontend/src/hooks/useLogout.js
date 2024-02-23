import { useAuthContext } from './useAuthContext'
import { useComplaintsContext } from './useComplaintsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchComplaints } = useComplaintsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchComplaints({type : 'SET_COMPLAINTS', payload: null})
  }

  return { logout }
}