import { ComplaintsContext } from '../context/ComplaintsContext'
import { useContext } from "react"

export const useComplaintsContext = () => {
  const context = useContext(ComplaintsContext)

  if(!context) {
    throw Error('useComplaintsContext must be used inside an ComplaintsContextProvider')
  }

  return context
}