// utilities
import { updateObject, updateArray } from './housekeeping';

/* LISTS REDUCER */

// state.lists.collection reducer
const collectionReducer = (state = {}, action) => {
  switch(action.type){
    case 'NEW_LIST':
    case 'UPDATE_LIST':
      return updateCollection(state, action);

    case 'DELETE_LIST':
      return deleteList(state, action);

    case 'BULK_UPDATE_LISTS':
      return updateObject(state, action.data.entities.lists);
    
    case 'DISPLACE_CARD':
      return displaceCard(state, action);

    case 'TRANSIT_CARD':
      return transitCard(state, action);

    case 'NEW_CARD':
      return addCardToList(state, action);

    case 'DELETE_CARD':
      return removeCardFromList(state, action);
      
    case 'FETCH_KANBAN':
      return action.data.entities.lists;

    case 'DELETE_KANBAN':
      return {};

    default:
      return state;
  }
};


// state.lists.index reducer
const indexReducer = (state = [], action) => {
  switch(action.type){
    case 'DISPLACE_LIST':
      return displaceList(state, action);

    case 'NEW_LIST':
      return updateArray(state, action.data.result);

    case 'DELETE_LIST':
      return state.filter(listId => listId !== action.item.id);
      
    case 'FETCH_KANBAN':
      return action.data.result;

    case 'DELETE_KANBAN':
      return [];

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

// state.lists.index
export const displaceList = (state, action) => {
  const { origin, destination } = action;

  const lists = Array.from(state),
        originIdx = lists.indexOf(origin),
        destinationIdx = lists.indexOf(destination),
        displaced = lists.splice(originIdx, 1)[0];
  lists.splice(destinationIdx, 0, displaced);

  return lists
};


// state.lists.collection
export const displaceCard = (state, action) => {
  const { origin, source, target } = action;

  const cards = Array.from(state[origin].cards),
        sourceIdx = cards.indexOf(source),
        targetIdx = cards.indexOf(target),
        displaced = cards.splice(sourceIdx, 1)[0];
  cards.splice(targetIdx, 0, displaced);

  return updateObject(state, {
    [origin]: updateObject(state[origin], { cards })
  })
};


// state.lists.collection
export const transitCard = (state, action) => {
  const { origin, source, target, destination } = action;

  const ocards = Array.from(state[origin].cards),
        dcards = Array.from(state[destination].cards),
        sourceIdx = ocards.indexOf(source),
        targetIdx = target ? dcards.indexOf(target) : dcards.length,
        displaced = ocards.splice(sourceIdx, 1)[0];
  dcards.splice(targetIdx, 0, displaced);

  return updateObject(state, {
    [origin]: updateObject(state[origin], { cards: ocards }),
    [destination]: updateObject(state[destination], { cards: dcards })
  })
};


// state.lists.collection
export const updateCollection = (state, action) => {
  const { result, entities } = action.data;

  return updateObject(state, {
    [result]: entities.lists[result]
  })
};


// state.lists.collection
export const deleteList = (state, action) => {
  let next = Object.assign({}, state)

  delete next[action.item.id]
  return next 
};


// state.lists.collection
export const addCardToList = (state, action) => {
  const { result } = action.data;
  const { luid } = action.data.entities.cards[result] 

  return updateObject(state, {
    [luid]: updateObject(state[luid], {
      cards: updateArray(state[luid].cards, result)
    })
  })
};


// state.lists.collection
export const removeCardFromList = (state, action) => {
  const { luid, id } = action.item;

  const cards = state[luid].cards.filter(cardId => cardId !== id)
  return updateObject(state, {
    [luid]: updateObject(state[luid], {
      cards: cards 
    })
  })
};
