import { USER, ERROR } from './types'
import { user } from '../../mock/data'
import axios from '../../axios/axios'
import { setUser, getLocalStorageUser } from '../../jobs/storage/localStore'

export const getUser = signedInUser => dispatch => {
    axios(user)
        .then(res => {
            console.log('res', res);
            console.log('signed in user', signedInUser);
            if(res.username === signedInUser.username && res.password === signedInUser.password) {
                setUser(signedInUser);
                dispatch({
                    type: USER,
                    payload: signedInUser 
                })
            } else {
                dispatch({
                    type: ERROR,
                    payload: 'User not found'
                })
            }
        })
}

export const isUserSignedIn = () => dispatch => {
    const user = getLocalStorageUser();

    if(user) {
        dispatch({
            type: USER,
            payload: user
        })
    } else {
        dispatch({
            type: USER,
            payload: {}
        })
    }
}