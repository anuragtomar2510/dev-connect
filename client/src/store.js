import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import setAuthToken from './utils/setAuthToken'
import logger from 'redux-logger'



const initialState = {}
const middleware = [thunk, logger]

const store = createStore(

        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))

);

let currentState = store.getState();

store.subscribe(() => {

        let previousState = currentState
        currentState = store.getState()

        // check if state has been updated

        
        
        if(previousState.auth.token !== currentState.auth.token) {

                const token = currentState.auth.token
                setAuthToken(token)

        }
});

export default store