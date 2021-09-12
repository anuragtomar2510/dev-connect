import axios from 'axios'
import {setAlert} from './alert'
import setAuthToken from '../utils/setAuthToken'
import {

        REGISTER_SUCCESS,
        REGISTER_FAIL,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT,
        USER_LOADED,
        AUTH_ERROR,
        CLEAR_PROFILE

} from './types'

// Load User
export const loadUser = () => async dispatch => {

       

        try {

                const res = await axios.get('http://localhost:5000/api/auth')

                if(res.data.errors) {

                        console.log(res.data.errors[0].message)
                        dispatch({

                                type : AUTH_ERROR
                                
                        })

                } else {

                        
                        dispatch({

                                type : USER_LOADED,
                                payload : res.data

                        })
                }
                
        } catch (err) {

                dispatch({

                        type : AUTH_ERROR

                })
        }
}

// Register
export const register = ({name, email, password}) => async dispatch => {

       

        const body = {

                name,
                email,
                password

        }

        
        try {
                const res = await axios.post(`http://localhost:5000/api/users/register`, body)
                
               

                        dispatch({

                                type : REGISTER_SUCCESS,
                                payload : res.data

                        })

                        dispatch(loadUser())
             

               
        } catch(err) {

                dispatch(setAlert(err.response.data.errors[0].msg, 'danger'))

                dispatch({

                        type : REGISTER_FAIL

                })

        }
}



// Login
export const login = (email, password) => async dispatch => {

       
      
        const body = {

           
                email,
                password

        }

        
        
        try {
                const res = await axios.post(`http://localhost:5000/api/users/login`, body)
                

                        dispatch({

                                type : LOGIN_SUCCESS,
                                payload : res.data

                        })

                        dispatch(loadUser())
             

               
        } catch(err) {

                dispatch(setAlert(err.response.data.errors[0].msg, 'danger'))

                dispatch({

                        type : LOGIN_FAIL

                })

        }
}


export const logout = () => dispatch => {

        dispatch({

                type : LOGOUT

        })

        dispatch({

                type : CLEAR_PROFILE
                
        })
}