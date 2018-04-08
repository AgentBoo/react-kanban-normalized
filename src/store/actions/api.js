// constants
import { actionType } from './../../config/constants';
// normalizr
import { normalize } from 'normalizr';
import * as schema from './../../config/schemas';
// fake api
import { api } from './../../config/backend';


// NOTE: Calls to api
// ============================================================================ //
// REQUESTS
// RESPONSES
// INITIAL DATA COMMUNICATION
export const receiveInitData = () => (dispatch) =>
  api('all').then((response) => dispatch({
    type    : actionType.RECEIVE_INIT_DATA,
    data    : normalize(response.lists, schema.lists).entities
  })
);


// LISTS
export const addList = (list) => (dispatch) =>
  api('add/list', list).then((response) => dispatch({
    type   : actionType.ADD_LIST,
    data   : normalize(response, schema.list)
  })
);

export const editList = (list) => (dispatch) =>
  api('edit/list', list).then((response) => dispatch({
    type   : actionType.EDIT_LIST,
    data   : normalize(response, schema.list)
  })
);

export const removeList = (list) => (dispatch) =>
  api('remove/list', list).then((response) => dispatch({
    type   : actionType.REMOVE_LIST,
    data   : normalize(response, schema.lists).entities
  })
);


// CARDS
export const addCard = (card) => (dispatch) =>
  api('add/card', card).then((response) => dispatch({
    type    : actionType.ADD_CARD,
    luid    : card.luid,
    data    : normalize(response, schema.card)
  })
);

export const editCard = (card) => (dispatch) =>
  api('edit/card', card).then((response) => dispatch({
    type    : actionType.EDIT_CARD,
    data    : normalize(response, schema.card)
  })
);

export const removeCard = (card) => (dispatch) =>
  api('remove/card', card).then((response) => dispatch({
    type    : actionType.REMOVE_CARD,
    id      : card.id,
    data    : normalize(response, schema.list)
  })
);

// BOARD
export const destroyAll = () => (dispatch) =>
  api('destroy/all').then((response) => dispatch({
    type    : actionType.DESTROY_ALL,
    data    : normalize(response.lists, schema.lists).entities
  }))
