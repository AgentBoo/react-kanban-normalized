// ============================================================================ //
// REDUX
// ============================================================================ //
export const actionType = {
  // kinematics
  DISPLACE_LIST     : 'DISPLACE_LIST',
  DISPLACE_CARD     : 'DISPLACE_CARD',
  TRANSIT_CARD      : 'TRANSIT_CARD',
  // requests
  // responses
  RECEIVE_INIT_DATA : 'RECEIVE_INIT_DATA',
  PASS_INIT_DATA    : 'PASS_INIT_DATA',
  ADD_LIST          : 'ADD_LIST',
  EDIT_LIST         : 'EDIT_LIST',
  REMOVE_LIST       : 'REMOVE_LIST',
  ADD_CARD          : 'ADD_CARD',
  EDIT_CARD         : 'EDIT_CARD',
  REMOVE_CARD       : 'REMOVE_CARD',
  DESTROY_ALL       : 'DESTROY_ALL'
};



// ============================================================================ //
// REACT-DND
// ============================================================================ //
// Drag sources and drop targets only interact if they have the same string type
export const itemType = {
  LIST      : 'list',
  CARD      : 'card'
};
