
import * as actionTypes from './actionTypes';
const defaultState ={
	forumList: [],
    list:[],
	detail:[]
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.FORUM_LIST:
			return {
				...state,
				forumList: action.data,
				list:action.data.results,

			}
		case actionTypes.FORUM_LIST_PAGE:
			return {
				...state,
				forumList: action.data,
				list:state.list.concat(action.data.results)

			}
		case actionTypes.FORUM_LIST_SEARCH:
			return {
				...state,
				forumList: action.data,
				list:action.data.results,

			}
		case actionTypes.FORUM_LIST_SEARCH_PAGE:
			return {
				...state,
				forumList: action.data,
				list:state.list.concat(action.data.results)

			}
			case actionTypes.FORUM_DETSILE:
				return {
					...state,
					detail:action.data
				}
		case actionTypes.DEL:
			return {
				...state,
				detail:[]
			}
		default:
			return state;
	}
}
