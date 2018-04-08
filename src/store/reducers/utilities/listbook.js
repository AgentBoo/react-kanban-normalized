// utilities
import { updateObject, updateArray }  from './housekeeping'


// NOTE: Quartenary (case) reducers
// ============================================================================ //
// ADD or EDIT LIST
export const updateCollection = (state, action) => {
  const { result, entities } = action.data;

  return updateObject(state, {
    [result]: entities.lists[result]
  })
};

// REMOVE LIST


// ADD CARD
export const addCardToList = (state, action) => {
  const { luid } = action;
  const { result } = action.data;

  return updateObject(state, {
    [luid]: updateObject(state[luid], {
      cards: updateArray(state[luid].cards, result)
    })
  })
};

// REMOVE CARD
export const removeCardFromList = (state, action) => {
  const { result, entities } = action.data;

  return updateObject(state, {
    [result]: updateObject(state[result], entities.lists[result])
  })
};
