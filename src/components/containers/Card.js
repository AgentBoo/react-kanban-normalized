// react
// react-dnd
import { DragSource, DropTarget } from 'react-dnd';
import { itemType } from './../../config/constants';
// redux
import { connect } from 'react-redux';
import { displaceCard, transitCard } from './../../store/actions/kinematics';
import { updateItem as updateCard, deleteItem as deleteCard, bulkUpdate } from './../../store/actions/requests';
// components
import CardComponent from './../coupled/Card';

/* CARD CONTAINER */

// react-dnd DRAG SOURCE
const dragSource = {
  beginDrag(props, monitor){
    return {
      id     : props.id,
      origin : props.luid,
      luid   : props.luid,
    }
  },

  endDrag(props, monitor){
      return props.bulkUpdate('update-cards', { 
        source: 'cards',
        origin: monitor.getItem().origin,
        destination: monitor.getItem().luid  
      })
  },


  // without explicitely specifying isDragging(), opacity changes will not work during transitCard()
  isDragging(props, monitor){
    return props.id === monitor.getItem().id
  },
};

const collectDragProps = (connector, monitor) => ({
  connectDragSource : connector.dragSource(),
  isDragging        : monitor.isDragging()
});


// react-dnd DROP TARGET
const dropTarget = {
  drop(props, monitor){
    return { 
      id: props.id, 
      type: 'card' 
    } 
  },

  hover(props, monitor){
    const card = monitor.getItem()

    if(card.id === props.id){
      return 
    }

    if(card.luid === props.luid){
      return window.requestAnimationFrame(() => 
        props.displaceCard(card.luid, card.id, props.id))
    } else {
      props.transitCard(card.luid, card.id, props.id, props.luid)
      return monitor.getItem().luid = props.luid
    }
  }
};

const collectDropProps = (connector, monitor) => ({
  connectDropTarget : connector.dropTarget()
});


// redux
const mapDispatchToProps = {
  displaceCard,
  transitCard,
  updateCard,
  deleteCard,
  bulkUpdate
};


let Card = DropTarget(itemType.CARD, dropTarget, collectDropProps)(CardComponent);
    Card = DragSource(itemType.CARD, dragSource, collectDragProps)(Card);
    Card = connect(null, mapDispatchToProps)(Card);

export default Card;
