// constants
import { actionType } from './../../config/constants';
// utilities
// import * as kinematics from './utilities/kinematics';
import * as logbook from './utilities/cardbook'
import { updateArray }  from './utilities/housekeeping';


// NOTE: Tertiary reducer
// ============================================================================ //
// state.cards.collection reducer
const collectionReducer = (state = {}, action) => {
  switch(action.type){
    case actionType.ADD_CARD:
    case actionType.EDIT_CARD:
      return logbook.updateCollection(state, action)

    // case actionType.TRANSIT_CARD:
      // do not confuse with kinematics.transitCard()
      // return kinematics.transittedCard(state, action)

    case actionType.REMOVE_CARD:
      return logbook.removeCard(state, action)

    case actionType.DESTROY_ALL:
      return {}

    case actionType.REMOVE_LIST:
    case actionType.RECEIVE_INIT_DATA:
      return action.data.cards;

    default:
      return state;
  }
};


// state.cards.index reducer
const indexReducer = (state = [], action) => {
  switch(action.type){
    case actionType.ADD_CARD:
      return updateArray(state, action.data.result);

    case actionType.REMOVE_CARD:
      return state.filter((id) => id !== action.id)

    case actionType.DESTROY_ALL:
      return []
      
    case actionType.RECEIVE_INIT_DATA:
      return Object.keys(action.data.cards);

    default:
      return state;
  }
};


// NOTE: Secondary reducer
// ============================================================================ //
const cardsReducer = (state = {}, action) => ({
  collection  : collectionReducer(state.collection, action),
  index       : indexReducer(state.index, action)
});

export default cardsReducer;
