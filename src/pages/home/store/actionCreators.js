import {getHomeList,getHomeListPage} from '../../../api/home';
import {getArticleSaerch} from '../../../api/article';
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


/**
 * 列表
 * @returns {Function}
 */
export const getHome = () => {
	return (dispatch) => {
		getHomeList().then(res => {
			dispatch(getHomeAction(res.data))
		})

	}
}
/**
 * 分页
 * @param page
 * @returns {Function}
 */
export const getHomePage = (page) => {
	return (dispatch) => {
		getHomeListPage(page).then(res => {
			dispatch(getHomePageAction(res.data))
		})

	}
}

export const getSerach = (data)=>({
	type:actionTypes.HOME_GET_ARTICLE_SEARCH,
	data
})

export const getSerachPage = (data)=>({
	type:actionTypes.HOME_GET_ARTICLE_SEARCH_PAGE,
	data
})

export const getSerachAxios = (name,page,type)=>{
	return (dispatch)=>{
		getArticleSaerch(name,page).then(res=>{
			type?dispatch(getSerachPage(res.data)):dispatch(getSerach(res.data))
		})
	}
}