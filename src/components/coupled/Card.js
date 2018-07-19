// react
import React, { Component } from 'react';
// components
import { Button, Glyphicon } from 'react-bootstrap';
import { EditableArea } from './../toolbox/EditableArea';

/* CARD COMPONENT */

class Card extends Component {
  // pass down
  removeCard = () => this.props.deleteCard('delete-card', {
    luid  : this.props.luid,
    id    : this.props.id
  });

  updateCard = (text) => this.props.updateCard('update-card',{
    luid  : this.props.luid,
    id    : this.props.id,
    text  : text 
  })

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
               className='form-control' value={ text } submitFn={ this.updateCard }/>
          </div>
        </div>
      )
    )
  }
// component end
};

export default Card;
