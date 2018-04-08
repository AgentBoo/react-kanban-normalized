// constants
import { actionType } from './../../config/constants';


// NOTE: KINEMATICS ACTIONS
// ============================================================================ //
// LIST
export const displaceList = (fromDragSourceId, overDropTargetId) => ({
  type        : actionType.DISPLACE_LIST,
  origin      : fromDragSourceId,
  destination : overDropTargetId
});


// CARD
export const displaceCard = (fromListId, fromDragSourceId, overDropTargetId) => ({
  type        : actionType.DISPLACE_CARD,
  origin      : fromListId,
  source      : fromDragSourceId,
  target      : overDropTargetId
});

export const transitCard = (fromListId, fromDragSourceId, overDropTargetId = null, intoListId) => ({
  type        : actionType.TRANSIT_CARD,
  origin      : fromListId,
  source      : fromDragSourceId,
  target      : overDropTargetId,
  destination : intoListId
});
