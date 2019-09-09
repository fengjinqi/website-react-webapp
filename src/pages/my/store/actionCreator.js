import {MY_GETINFO,MY_ERROR} from './actionTypes'
import {getInfo} from '../../../api/user'

export const getMyInfo = (data)=>({
    type:MY_GETINFO,
    data
})

export const getError = (error)=>({
    type:MY_ERROR,
    error
})

export const getMyInfoAxios = (token)=>{
    return (dispatch)=>{
        getInfo(token).then(res=>{
            dispatch(getMyInfo(res.data))
        }).catch(err=>{
            dispatch(getMyInfo(err.response.data))
        })
    }
}