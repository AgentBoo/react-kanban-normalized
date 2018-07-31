// constants
import { actionType } from './../../config/constants';

/* OBJECT MOVING ACTION CREATORS */

export const displaceList = (fromDragSourceId, overDropTargetId) => ({
  type        : actionType['displace-list'],
  origin      : fromDragSourceId,
  destination : overDropTargetId
});

export const displaceCard = (fromListId, fromDragSourceId, overDropTargetId) => ({
  type        : actionType['displace-card'],
  origin      : fromListId,
  source      : fromDragSourceId,
  target      : overDropTargetId
});

export const transitCard = (fromListId, fromDragSourceId, overDropTargetId = null, intoListId) => ({
  type        : actionType['transit-card'],
  origin      : fromListId,
  source      : fromDragSourceId,
  target      : overDropTargetId,
  destination : intoListId
});

