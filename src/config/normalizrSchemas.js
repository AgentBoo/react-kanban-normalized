import { schema } from 'normalizr';

// Additional information on schemas and normalizr can be found at 
// https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#schema

// normalize one card 
export const cardSchema = new schema.Entity('cards');

// normalize array of cards 
export const cardsSchema = [ cardSchema ];

// normalize one list 
export const listSchema = new schema.Entity('lists', { 
	cards: [ cardSchema ] 
});

// normalize array of lists 
export const listsSchema = [ listSchema ];


// named urlpattern => schema mappings 
const Schemas = {
	'fetch-kanban': listsSchema,
	'new-list': listSchema, 
	'update-list': listSchema,
	'update-lists': listsSchema,
	'new-card': cardSchema,
	'update-card': cardSchema, 
	'update-cards': cardsSchema,
};

export default Schemas;


