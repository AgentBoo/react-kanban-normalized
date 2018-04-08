// redux
import { combineReducers } from 'redux'
// secondary reducers
import listsReducer from './reducers/lists'
import cardsReducer from './reducers/cards'


// NOTE: Root selectors -- use state of combined (root) reducer
export const myCards = (state, luid) => selectCards(
  state.lists.collection,
  state.cards.collection,
  luid
);


// NOTE: Slice selectors -- use state of secondary (slice) reducers
const selectCards = (lists, cards, luid) => {
  const cardIds = lists[luid].cards
  return cardIds.map((id) => cards[id])
}


// ============================================================================ //
// Root reducer
// ============================================================================ //
const root = combineReducers({
  lists: listsReducer,
  cards: cardsReducer
})

export default root;
