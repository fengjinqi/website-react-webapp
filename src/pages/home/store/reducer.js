
import * as actionTypes from './actionTypes';

const defaultState ={
	articleList: [],
	isShow:true
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.HOME_GET_LIST:
			return{
				...state,
				articleList: action.data,
				isShow: false
			}

		default:
			return state;
	}
}
