// react
// react-dnd
import { DragSource, DropTarget } from 'react-dnd';
import { itemType } from './../../config/constants';
// redux
import { connect } from 'react-redux';
import { myCards } from './../../store/selectors';
import { displaceList, transitCard } from './../../store/actions/kinematics';
import { updateItem as updateList, deleteItem as deleteList, bulkUpdate } from './../../store/actions/requests';
// components
import ListComponent from './../presentational/List';

/* LIST CONTAINER */

// react-dnd DRAG SOURCE
const dragSourceSpec = {
  beginDrag(props, monitor){
    const dragSource = { id: props.id }
    return dragSource
  }, 

  endDrag(props, monitor, component){
    return props.bulkUpdate('update-lists', { source: 'lists' })
  },

  isDragging(props, monitor){
    return props.id === monitor.getItem().id
  },
};

const collectDragProps = (connector, monitor) => ({
  connectDragSource : connector.dragSource(),
  isDragging        : monitor.isDragging()
});


// react-dnd DROP TARGET
const dropTargetSpec = { 
  drop(props, monitor){
    const dropTarget = { 
      id: props.id, 
      type: 'list' 
    }
    return dropTarget 
  },

  hover(props, monitor){
    const dragSource = monitor.getItem();
    const dragSourceType = monitor.getItemType();
    if(dragSourceType === itemType.LIST && dragSource.id === props.id){
      return
    }

    if(dragSourceType === itemType.LIST && dragSource.id !== props.id){
      return window.requestAnimationFrame(() => 
        props.displaceList(dragSource.id, props.id))
    }

    if(dragSourceType === itemType.CARD && dragSource.luid !== props.id && monitor.isOver({ shallow: true })){
      props.transitCard(dragSource.luid, dragSource.id, null, props.id)
      return monitor.getItem().luid = props.id
    }
  }
};

const collectDropProps = (connector, monitor) => ({
  connectDropTarget : connector.dropTarget()
});


// redux
const mapStateToProps = (state, intrinsic) => ({
  cards: myCards(state, intrinsic.id)
});

const mapDispatchToProps = {
  displaceList,
  transitCard,
  updateList,
  deleteList,
  bulkUpdate
};


let List = DropTarget([itemType.LIST, itemType.CARD], dropTargetSpec, collectDropProps)(ListComponent);
    List = DragSource(itemType.LIST, dragSourceSpec, collectDragProps)(List);
    List = connect(mapStateToProps, mapDispatchToProps)(List);

export default List;
