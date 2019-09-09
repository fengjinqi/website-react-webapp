import {MY_GETINFO,MY_ERROR} from './actionTypes'
const defaultState = {
    info:[],
    error:[],
    isShow:false
}

export default (state=defaultState,action)=>{
    switch (action.type) {
        case MY_GETINFO:
            return {
                ...state,
                info:action.data,
                isShow:true
            }
        case MY_ERROR:
            return {
                ...state,
                error:action.error
            }
        default:
            return state
    }

}