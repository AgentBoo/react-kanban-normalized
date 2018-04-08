// react
// react-dnd
import { DragSource, DropTarget } from 'react-dnd';
import { itemType } from './../../config/constants';
// redux
import { connect } from 'react-redux';
import { myCards } from './../../store/root';
import { displaceList, transitCard } from './../../store/actions/kinematics';
import { editCard, editList, removeList } from './../../store/actions/api';
// components
import ListComponent from './../presentational/List';


// ============================================================================ //
// List container
// ============================================================================ //
// NOTE: React-DnD
// DRAG SOURCE
const dragSourceSpec = {
  beginDrag(props, monitor){
    const dragSource = {
      id: props.id
    }
    return dragSource
  }
};

const collectDragProps = (connector, monitor) => ({
  connectDragSource : connector.dragSource(),
  isDragging        : monitor.isDragging()
});


// DROP TARGET
const dropTargetSpec = {
  drop(props, monitor){
    const dropTarget = {
      id: props.id
    }
    return dropTarget
  },

  hover(props, monitor){
    const dragSource = monitor.getItem();
    const dragSourceType = monitor.getItemType();

    if(dragSourceType === itemType.LIST && dragSource.id === props.id){
      return
    }

    if(dragSourceType === itemType.LIST){
      props.displaceList(dragSource.id, props.id)
      return
    }

    if(dragSourceType === itemType.CARD && dragSource.luid !== props.id && monitor.isOver({ shallow: true })){
      props.transitCard(dragSource.luid, dragSource.id, null, props.id)
      props.editCard({ luid: dragSource.luid, id: dragSource.id, to: props.id })
      monitor.getItem().luid = props.id
      return
    }
  }
};

const collectDropProps = (connector, monitor) => ({
  connectDropTarget : connector.dropTarget()
});


// NOTE: Redux
const mapStateToProps = (state, intrinsic) => ({
  cards: myCards(state, intrinsic.id)
});
const mapDispatchToProps = {
  displaceList,
  editList,
  removeList,
  editCard,
  transitCard
};

// ============================================================================ //
let List = DragSource(itemType.LIST, dragSourceSpec, collectDragProps)(ListComponent);
    List = DropTarget([itemType.LIST, itemType.CARD], dropTargetSpec, collectDropProps)(List);
    List = connect(mapStateToProps, mapDispatchToProps)(List);

export default List;
