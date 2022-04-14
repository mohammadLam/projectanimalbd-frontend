import { useContext } from 'react'
import axios from 'axios'

import { AuthContext } from '../context/auth'

interface AuthResponse {
  accessToken: string
  refreshToken: string
}

const useAuth = async () => {
  const { dispatch } = useContext(AuthContext)

  try {
    const user = await axios.get<AuthResponse>('/auth')

    if (user.status === 200) dispatch({ type: 'store', payload: user.data })
  } catch (error) {
    console.log(error)
  }
}

export default useAuth
