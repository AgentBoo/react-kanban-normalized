// redux
import { combineReducers } from 'redux';
// secondary reducers
import cardsReducer from './reducers/cards';
import listsReducer from './reducers/lists';


/* REQUEST STATUS SECONDARY REDUCERS */

// state.isFetching reducer
const isFetchingReducer = (state=false, action) => {
	switch(action.type){
		case 'DATA_REQUEST':
			return true 
		case 'DATA_SUCCESS':
		case 'DATA_FAILURE':
		case 'BULK_UPDATE_LIST':
		case 'BULK_UPDATE_CARDS':
			return false 
		default:
			return state 
	}
};

// state.errorMessage reducer 
const flashMessageReducer = (state=null, action) => {
	switch(action.type){
		case 'DATA_REQUEST': 
		case 'FLASH_END':
			return null
		case 'DATA_SUCCESS':
			return state  
		case 'DATA_FAILURE':
			return action.message  
		default:
			return state 
	}
};


/* ROOT REDUCER */

const rootReducer = combineReducers({
  isFetching    : isFetchingReducer,
  flashMessage  : flashMessageReducer,
  lists   : listsReducer,
  cards   : cardsReducer,
});

export default rootReducer;