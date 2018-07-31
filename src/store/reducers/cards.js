// utilities
import { updateObject }  from './housekeeping';

/* CARDS REDUCER */

// state.cards.collection reducer
const collectionReducer = (state = {}, action) => {
  switch(action.type){
    case 'TRANSIT_CARD':
      return updateCardInCollection(state,action); 

    case 'NEW_CARD':
    case 'UPDATE_CARD':
      return updateCollection(state, action);

    case 'DELETE_CARD':
      return removeCardFromCollection(state, action);

    case 'BULK_UPDATE_CARDS':
      return updateObject(state, action.data.entities.cards);
    
    case 'DELETE_LIST':
      return removeCardsFromCollection(state, action);

    case 'FETCH_KANBAN':
      return action.data.entities.cards;

    case 'DESTROY_KANBAN':
      return {};

    default:
      return state;
  }
};


const cardsReducer = (state = {}, action) => ({
  collection  : collectionReducer(state.collection, action),
});

export default cardsReducer;


// CASE REDUCERS 

const updateCardInCollection = (state, action) => {
  const { source, destination } = action 
      
  return updateObject(state, {
    [source]: updateObject(state[source], {
      luid: destination
    })
  })
};

const updateCollection = (state, action) => {
  const { result, entities } = action.data

  return updateObject(state, {
    [result]: entities.cards[result]
  })
};

const removeCardFromCollection = (state, action) => {
  const cards = Object.assign({}, state)
  delete cards[action.item.id]

  return cards
};

const removeCardsFromCollection = (state, action) => {
  let cards = Object.assign({}, state)
  
  for(const cardId in cards){
    if(cards[cardId].luid === action.id){
      delete cards[cardId]
    }
  }

  return cards
};