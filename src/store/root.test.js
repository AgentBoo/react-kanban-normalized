// https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md
// a reducer should return the new state after applying the action to the
// previous state

import { normalize } from 'normalizr';
import * as schema from './../../config/schemas'

import { db, api } from './../../config/backend'

import root from './root'
import cardlistsReducer from './reducers/cardlists'
import cardsReducer from './reducers/cards'
import { proposed, initial, displace_list, displace_card, transit_card, normalized } from './../../config/testableStates'


// NOTE: Root reducer
// ============================================================================ //
// initial state
describe('root reducer: initial data', () => {
  const data = { "all": db.lists }
  it('should handle initial state', () => {
    expect(
      root(undefined, {})
    ).toEqual(proposed)
  })

  it('should accept initial data from api response', () => {
    expect(
      root(proposed, {
        type: 'RECEIVE_INIT_DATA',
        data: normalize(data.all, schema.cardlists).entities
      })
    ).toEqual(normalized)
  })

// end test
})


// kinematics related actions
describe('root reducer: drag and drop related kinematics', () => {
  it('should handle moving list 1 over list 2', () => {
    expect(
      root(initial, {
        type: 'DISPLACE_LIST',
        origin: 'l1',
        destination: 'l2'
      })
    ).toEqual(displace_list)
  })


  it('should handle moving card 1 over card 2', () => {
    expect(
      root(initial, {
        type: 'DISPLACE_CARD',
        origin: 'l1',
        source: 'c1',
        target: 'c2'
      })
    ).toEqual(displace_card)
  })


  it('should handle moving card 2 from list 1 over card 3 in list 2', () => {
    expect(
      root(initial, {
        type: 'TRANSIT_CARD',
        origin: 'l1',
        source: 'c2',
        target: 'c3',
        destination: 'l2'
      })
    ).toEqual(transit_card)
  })

// end test
})
