// utilities
import { updateObject }  from './housekeeping';


// CARDS REDUCER 

// state.cards.collection reducer
const collectionReducer = (state = {}, action) => {
  switch(action.type){
    case 'TRANSIT_CARD':
      const { source, destination } = action 
      
      return updateObject(state, {
        [source]: updateObject(state[source], {
          luid: destination
        })
      }) 

    case 'NEW_CARD':
    case 'UPDATE_CARD':
      return updateCollection(state, action)

    case 'DELETE_CARD':
      return removeCard(state, action) 

    case 'BULK_UPDATE_CARDS':
      return updateObject(state, action.data.entities.cards)
    
    case 'DELETE_LIST':
      let cards = Object.assign({}, state)
      for(const cardId in cards){
        if(cards[cardId].luid === action.id){
          delete cards[cardId]
        }
      }
      return cards

    case 'FETCH_KANBAN':
      return action.data.entities.cards;

    case 'DESTROY_KANBAN':
      return {}

    default:
      return state;
  }
};


const cardsReducer = (state = {}, action) => ({
  collection  : collectionReducer(state.collection, action),
});

export default cardsReducer;


// CASE REDUCERS 

const updateCollection = (state, action) => {
  const { result, entities } = action.data

  return updateObject(state, {
    [result]: entities.cards[result]
  })
};

const removeCard = (state, action) => {
  const cards = Object.assign({}, state);
  delete cards[action.id]

  return cards
};
