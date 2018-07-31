/* STATE SELECTORS */

export const getIsFetching = (state) => state.isFetching;

export const getLists = (state) => {
	const { index, collection } = state.lists;
	return index.map(id => collection[id])
};
 
export const myCards = (state, id) => {
	const { collection } = state.lists
	return collection[id].cards.map(cardId => state.cards.collection[cardId])
};