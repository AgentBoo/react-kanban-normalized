import { schema } from 'normalizr';
// import { normalize } from 'normalizr'
// import { api } from './../config/backend'


// NOTE: Schemas used by normalize()
// ============================================================================ //
// individual card
export const card = new schema.Entity('cards');
// cards array
export const cards = [ card ]
// individual list
export const list = new schema.Entity('lists', { cards: [ card ] });
// lists array
export const lists = [ list ]



// Get api response and normalized output
// api('remove', {id: "default"})
//   .then((response) => {
//      console.log('Response: ', response)
//      console.log('Normalized response: ', normalize(response, list))
//    });
