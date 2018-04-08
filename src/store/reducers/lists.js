// constants
import { actionType } from './../../config/constants';
// utilities
import * as kinematics from './utilities/kinematics';
import * as logbook from './utilities/listbook'
import { updateArray } from './utilities/housekeeping';


// NOTE: Tertiary reducers
// ============================================================================ //
// state.lists.collection reducer
const collectionReducer = (state = {}, action) => {
  switch(action.type){
    case actionType.ADD_LIST:
    case actionType.EDIT_LIST:
      return logbook.updateCollection(state, action)

    case actionType.ADD_CARD:
      return logbook.addCardToList(state, action)

    case actionType.DISPLACE_CARD:
      return kinematics.displaceCard(state, action);

    case actionType.TRANSIT_CARD:
      return kinematics.transitCard(state, action);

    case actionType.REMOVE_CARD:
      return logbook.removeCardFromList(state, action);

    case actionType.DESTROY_ALL:
      return {}

    case actionType.REMOVE_LIST:
    case actionType.RECEIVE_INIT_DATA:
      return action.data.lists;

    default:
      return state;
  }
};


// state.lists.index reducer
const indexReducer = (state = [], action) => {
  switch(action.type){
    case actionType.ADD_LIST:
      return updateArray(state, action.data.result)

    case actionType.DISPLACE_LIST:
      return kinematics.displaceList(state, action);

    case actionType.DESTROY_ALL:
      return []
      
    case actionType.REMOVE_LIST:
    case actionType.RECEIVE_INIT_DATA:
      return Object.keys(action.data.lists);

    default:
      return state;
  }
};


// NOTE: Secondary reducer
// ============================================================================ //
const listsReducer = (state = {}, action) => ({
  collection  : collectionReducer(state.collection, action),
  index       : indexReducer(state.index, action)
});

export default listsReducer;
