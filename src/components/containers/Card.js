// react
// react-dnd
import { DragSource, DropTarget } from 'react-dnd';
import { itemType } from './../../config/constants';
// redux
import { connect } from 'react-redux';
import { displaceCard, transitCard } from './../../store/actions/kinematics';
import { editCard, removeCard } from './../../store/actions/api';
// components
import CardComponent from './../coupled/Card';


// ============================================================================ //
// Card container
// ============================================================================ //
// NOTE: React-DnD
// DRAG SOURCE
const dragSourceSpec = {
  beginDrag(props, monitor){
    const dragSource = {
      id     : props.id,
      luid   : props.luid,
      status : props.status
    }
    return dragSource
  },
  // without explicitely specifying isDragging(), opacity changes will not work during transitCard()
  isDragging(props, monitor){
    return props.id === monitor.getItem().id
  }
};

const collectDragProps = (connector, monitor) => ({
  connectDragSource : connector.dragSource(),
  isDragging        : monitor.isDragging()
});


// DROP TARGET
const dropTargetSpec = {
  canDrop(props, monitor){
    const card = monitor.getItem()
    return card.status === 'suggested' || props.status !== 'suggested' || props.luid !== 'default'
  },

  hover(props, monitor){
    const card = monitor.getItem()

    if(card.id === props.id || !monitor.canDrop()){
      return
    }

    if(card.luid === props.luid){
      props.displaceCard(card.luid, card.id, props.id)
      return
    } else {
      props.transitCard(card.luid, card.id, props.id, props.luid)
      props.editCard({ luid: card.luid, id: card.id, to: props.luid })
      monitor.getItem().luid = props.luid
      return
    }
  }
};

const collectDropProps = (connector, monitor) => ({
  connectDropTarget : connector.dropTarget()
});


// NOTE: Redux
const mapDispatchToProps = {
  displaceCard,
  editCard,
  removeCard,
  transitCard
};

// ============================================================================ //
let Card = DragSource(itemType.CARD, dragSourceSpec, collectDragProps)(CardComponent);
    Card = DropTarget(itemType.CARD, dropTargetSpec, collectDropProps)(Card);
    Card = connect(null, mapDispatchToProps)(Card);

export default Card;
