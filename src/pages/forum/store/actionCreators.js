import {ForumList,ForumDetail,ForumListPage,ForumListSearch} from '../../../api/forum';

import * as actionTypes from './actionTypes';



export const getListAction = (data)=>({
	type:actionTypes.FORUM_LIST,
	data
})
export const getListActionPage = (data)=>({
	type:actionTypes.FORUM_LIST_PAGE,
	data
})

export const getListActionAxios = ()=>{
	return (dispatch)=>{
		ForumList().then(res=>{
			dispatch(getListAction(res.data))
		})
	}
}

export const getListActionPageAxios = (page)=>{
	return (dispatch)=>{
		ForumListPage(page).then(res=>{
			dispatch(getListActionPage(res.data))
		})
	}
}

export const getSerach = (data)=>({
	type:actionTypes.FORUM_LIST_SEARCH,
	data
})

export const getSerachPage = (data)=>({
	type:actionTypes.FORUM_LIST_SEARCH_PAGE,
	data
})

export const getSerachAxios = (name,page,type,n)=>{
	return (dispatch)=>{
		ForumListSearch(name,page,n).then(res=>{
			type?dispatch(getSerachPage(res.data)):dispatch(getSerach(res.data))
		})
	}
}

export const getDetaile = (data)=>({
	type:actionTypes.FORUM_DETSILE,
	data
})

export const getgetDetailePageAxios = (id)=>{
	return (dispatch)=>{
		ForumDetail(id).then(res=>{
			dispatch(getDetaile(res.data))
		})
	}
}
export const ArticleDel = ()=>({
	type:actionTypes.DEL
})