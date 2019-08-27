import {getHomeList,getHomeListPage} from '../../../api/home';
import * as actionTypes from './actionTypes';

/**
 * 派发homeaction
 * @param data
 * @returns {{data: *, type: string}}
 */
export const getHomeAction = (data)=>({
	type:actionTypes.HOME_GET_LIST,
	data
})
export const getHomePageAction = (data)=>({
	type:actionTypes.HOME_GET_PAGING,
	data
})





export const getHome = () => {
	return (dispatch) => {
		getHomeList().then(res => {
			dispatch(getHomeAction(res.data))
		})

	}
}
export const getHomePage = (page) => {
	return (dispatch) => {
		getHomeListPage(page).then(res => {
			dispatch(getHomePageAction(res.data))
		})

	}
}

