// utilities
import { updateObject }  from './housekeeping'


// NOTE: Quartenary (case) reducers
// ============================================================================ //
// DISPLACE LIST
export const displaceList = (state, action) => {
  const { origin, destination } = action;

  const lists = Array.from(state),
        originIdx = lists.indexOf(origin),
        destinationIdx = lists.indexOf(destination),
        displaced = lists.splice(originIdx, 1)[0];
  lists.splice(destinationIdx, 0, displaced);

  return lists
};


// DISPLACE CARD
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


// TRANSIT CARD
// state: state.lists.collection
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

// state: state.cards.collection
// export const transittedCard = (state, action) => {
//   const { source, destination } = action;
//
//   const card = Object.assign({}, state[source])
//         card.luid = destination;
//
//   return updateObject(state, { [source]: card })
// };
