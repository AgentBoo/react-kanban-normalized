// utilities
import { updateObject }  from './housekeeping'


// NOTE: Quartenary (case) reducers
// ============================================================================ //
// ADD CARD
// EDIT CARD
export const updateCollection = (state, action) => {
  const { result, entities } = action.data

  return updateObject(state, {
    [result]: entities.cards[result]
  })
};

// REMOVE CARD
export const removeCard = (state, action) => {
  const { id } = action;
  const cards = Object.assign({}, state);
  delete cards[id]

  return cards
};
