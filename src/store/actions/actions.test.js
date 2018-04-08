// https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md
// when testing action creators, we want to test 1/ whether the correct action
// creator was called and 2/ whether the right action was returned

import { actionType } from './../../constants'
import * as actions from './actions'


// ============================================================================ //
// kinematics related actions
describe('actions related to drag and dropping items', () => {
  const fromListId = 'l1';
  const fromDragSourceId = 'c1';
  const overDropTargetId = 'c2';
  const intoListId = 'l2';


  it('should create an action to move List 1 over List 2', () => {
    const expected = {
      type         : 'DISPLACE_LIST',
      origin       : fromDragSourceId,
      destination  : overDropTargetId
    }
    expect(actions.displaceList(fromDragSourceId, overDropTargetId)).toEqual(expected)
  })


  it('should create an action to move Card 1 over Card 2 within List 1', () => {
    const expected = {
      type        : 'DISPLACE_CARD',
      origin      : fromListId,
      source      : fromDragSourceId,
      target      : overDropTargetId
    }
    expect(actions.displaceCard(fromListId, fromDragSourceId, overDropTargetId)).toEqual(expected)
  })


  it('should create an action to move Card 1 from List 1 over Card 2 in List 2', () => {
    const expected = {
      type        : 'TRANSIT_CARD',
      origin      : fromListId,
      source      : fromDragSourceId,
      target      : overDropTargetId,
      destination : intoListId
    }
    expect(actions.transitCard(fromListId, fromDragSourceId, overDropTargetId, intoListId)).toEqual(expected)
  })

// end kinematics test
});
