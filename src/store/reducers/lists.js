// utilities
import { updateObject, updateArray } from './housekeeping';
import * as kinematics from './kinematics';


// LISTS REDUCER 

// state.lists.collection reducer
const collectionReducer = (state = {}, action) => {
  switch(action.type){
    case 'NEW_LIST':
    case 'UPDATE_LIST':
      return updateCollection(state, action)

    case 'DELETE_LIST':
      return deleteList(state, action)

    case 'NEW_CARD':
      return addCardToList(state, action)

    case 'DELETE_CARD':
      return removeCardFromList(state, action);

    case 'DISPLACE_CARD':
      return kinematics.displaceCard(state, action);

    case 'TRANSIT_CARD':
      return kinematics.transitCard(state, action);

    case 'DESTROY_ALL':
      return {}

    case 'BULK_UPDATE_LISTS':
      return updateObject(state, action.data.entities.lists)
      
    case 'FETCH_KANBAN':
      return action.data.entities.lists;

    case 'DESTROY_KANBAN':
      return {}

    default:
      return state;
  }
};


// state.lists.index reducer
const indexReducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_LIST':
      return updateArray(state, action.data.result)
    case 'DELETE_LIST':
      return state.map(listId => listId !== action.id)

    case 'DISPLACE_LIST':
      return kinematics.displaceList(state, action)

    case 'DESTROY_KANBAN':
      return []
      
    case 'FETCH_KANBAN':
      return action.data.result;

    default:
      return state;
  }
};


const listsReducer = (state = {}, action) => ({
  collection  : collectionReducer(state.collection, action),
  index       : indexReducer(state.index, action)
});

export default listsReducer;


// CASE REDUCERS 

export const updateCollection = (state, action) => {
  const { result, entities } = action.data;

  return updateObject(state, {
    [result]: entities.lists[result]
  })
};

export const deleteList = (state, action) => {
  let next = Object.assign({}, state)

  delete next[action.id]
  return next 
}

export const addCardToList = (state, action) => {
  const { result } = action.data;
  const { luid } = action.data.entities.cards[result] 

  return updateObject(state, {
    [luid]: updateObject(state[luid], {
      cards: updateArray(state[luid].cards, result)
    })
  })
};

export const removeCardFromList = (state, action) => {
  const { luid, id } = action;

  const cards = state[luid].cards.map(cardId => cardId !== id)
  return updateObject(state, {
    [luid]: updateObject(state[luid], {
      cards: cards 
    })
  })
};
