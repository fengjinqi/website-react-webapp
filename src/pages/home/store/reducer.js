
import * as actionTypes from './actionTypes';

const defaultState ={
	articleList: [],
    list:[],
	isShow:true
}

export default (state = defaultState, action) => {
	switch (action.type) {

		case actionTypes.HOME_GET_LIST:
			return{
				...state,
				articleList: action.data,
                list:action.data.results,
				isShow: false
			}
        case actionTypes.HOME_GET_PAGING:
            return {
                ...state,
                articleList: action.data,
                list:state.list.concat(action.data.results)
            }
		case actionTypes.HOME_GET_ARTICLE_SEARCH:
			return {
				...state,
				articleList: action.data,
				list:action.data.results,

			}
		case actionTypes.HOME_GET_ARTICLE_SEARCH_PAGE:
			console.log(action)
			return {
				...state,
				articleList: action.data,
				list:state.list.concat(action.data.results)

			}
		default:
			return state;
	}
}
