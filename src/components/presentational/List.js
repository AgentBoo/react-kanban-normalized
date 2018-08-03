// react
import React, { Component } from 'react';
// components
import Card from './../containers/Card';
import { Button, Glyphicon } from 'react-bootstrap';
import { EditableLine } from './../toolbox/EditableLine';
import { CardAssistant } from './../coupled/CardAssistant';

/* LIST COMPONENT */

class List extends Component {
  renderCard = (card) => (
    <Card
      key={ card.id }
      id= { card.id }
      luid={ card.luid }
      text={ card.text }
      { ...card } />
  );

  // pass down
  editList = (value) => this.props.updateList('update-list', { 
    id: this.props.id, 
    label: value  
  });

  removeList = () => this.props.deleteList('delete-list', { 
    id: this.props.id 
  });

  render(){
    const { connectDragSource, connectDropTarget, isDragging } = this.props;
    const { cards, label } = this.props;
    const cardsload = cards.map((card) => this.renderCard(card));
   
    return connectDragSource(
      connectDropTarget(
        <div className={ isDragging ? 'is-dragging' : null}>
          <div className='list panel form-group'>
            <div className='panel-inline-custom panel-heading'>
              <EditableLine
                altclassName='form-control form-control-plaintext'
                className='form-control editable'
                value= { label }
                submitFn = { this.editList } />
              <Button
                bsSize='sm'
                onClick={ this.removeList }>
                <Glyphicon glyph='remove' />
              </Button>
            </div>
            <div className='panel-body'>
              { cardsload }
              <CardAssistant
                luid={ this.props.id } 
                text='Add a new card...'/>
            </div>
          </div>
        </div>
      )
    )
  };
// component end
};

export default List;
