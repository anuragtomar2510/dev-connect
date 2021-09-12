import {v4 as uuidv4} from 'uuid'
import {SET_ALERT, REMOVE_ALERT} from './types'

export const setAlert = (msg, alertType) => dispatch => {

        const _id = uuidv4()
        dispatch({

                type : SET_ALERT,
                payload : {

                        _id,
                        msg,
                        alertType
                        
                }
        })

        setTimeout(() => {

                dispatch({

                        type : REMOVE_ALERT,
                        payload : _id
                        
                })

        }, 5000)
}