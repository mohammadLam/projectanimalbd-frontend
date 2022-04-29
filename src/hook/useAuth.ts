import { useContext } from 'react'
import axios from 'axios'

import { AuthContext } from '../context/auth'

const useAuth = async () => {
  const { dispatch } = useContext(AuthContext)

  try {
    const { data, status } = await axios.get('/auth', {
      withCredentials: true
    })

    if (status === 200)
      dispatch({
        type: 'authenticated',
        payload: data
      })
  } catch (error) {
    console.log(error)
  }
}

export default useAuth
