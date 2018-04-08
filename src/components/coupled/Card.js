// react
import React, { Component } from 'react';
// components
import { Button, Glyphicon } from 'react-bootstrap';
import { EditableArea } from './../toolbox/EditableArea';


// ============================================================================ //
// Card component
// ============================================================================ //
class Card extends Component {
  // pass down
  removeCard = () => this.props.removeCard({
    luid  : this.props.luid,
    id    : this.props.id
  });

  render(){
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const draggingStyle = isDragging ? 'card is-dragging' : 'card'

    return connectDragSource(
      connectDropTarget(
        <div className={ draggingStyle }>
          <div className='card-header'>
            <Button
               bsSize='xs'
               className='transparent'
               onClick={ this.removeCard }>
               <Glyphicon glyph='remove' />
            </Button>
            <Button
               bsSize='xs'
               className='transparent'
               onClick={ this.removeCard }>
               <Glyphicon glyph='remove' />
            </Button>
          </div>
          <div className='card-body form-group'>
            <EditableArea
               className='form-control' value={ text } />
          </div>
        </div>
      )
    )
  }
// component end
};

export default Card;
