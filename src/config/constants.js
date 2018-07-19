// global var API_ROOT
export const API_ROOT = process.env.NODE_ENV === 'production' ? 
                        '' : 
                        'http://127.0.0.1:8000/api/kanban';
                        
// do not set your own 'Origin' in the headers
export const ORIGIN = process.env.NODE_ENV === 'production' ? 
                      '' : 
                      'http://localhost:3000';


// named urlpattern => endpoint mappings 
export const endpoint = {
  'fetch-kanban'    : API_ROOT + '/board',
  'new-list'        : API_ROOT + '/lists',
  'update-list'     : API_ROOT + '/lists/',
  'update-lists'    : API_ROOT + '/lists/bulk',
  'delete-list'     : API_ROOT + '/lists/',
  'new-card'        : API_ROOT + '/cards',
  'update-card'     : API_ROOT + '/cards/',
  'update-cards'    : API_ROOT + '/cards/bulk',
  'delete-card'     : API_ROOT + '/cards/',
  'destroy-kanban'  : API_ROOT + '/kaboom',
};


// named urlpattern => action type mappings  
export const actionType = {
  // requests 
  'data-request'    : 'DATA_REQUEST',
  // responses
  'data-success'    : 'DATA_SUCCESS',
  'data-failure'    : 'DATA_FAILURE',
  // CRUD 
  'fetch-kanban'    : 'FETCH_KANBAN',
  'new-list'        : 'NEW_LIST',
  'update-list'     : 'UPDATE_LIST',
  'update-lists'    : 'BULK_UPDATE_LIST',
  'delete-list'     : 'DELETE_LIST',
  'new-card'        : 'NEW_CARD',
  'update-card'     : 'UPDATE_CARD',
  'update-cards'    : 'BULK_UPDATE_CARDS',
  'delete-card'     : 'DELETE_CARD',
  // kinematics
  'displace-list'   : 'DISPLACE_LIST',
  'displace-card'   : 'DISPLACE_CARD',
  'transit-card'    : 'TRANSIT_CARD',
  'card-dragging'   : 'CARD_DRAGGING',
  'list-dragging'   : 'LIST_DRAGGING',
  'destroy-kanban'  : 'DESTROY_KANBAN',
};


// react-dnd 
// DragSources and DropTargets only interact if they are of the same type
export const itemType = {
  LIST : 'LIST',
  CARD : 'CARD'
};
