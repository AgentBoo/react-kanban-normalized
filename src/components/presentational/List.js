// react
import React, { Component } from 'react';
// components
import Card from './../containers/Card';
import { Button, Glyphicon } from 'react-bootstrap';
import { EditableLine } from './../toolbox/EditableLine';
import { CardAssistant } from './../coupled/CardAssistant';


// ============================================================================ //
// List component
// ============================================================================ //
class List extends Component {
  renderCard = (card) => (
    <Card
       key={ card.id }
       id= { card.id }
       luid={ card.luid }
       { ...card } />
  );

  // pass down
  editList = (value) => this.props.editList({ id: this.props.id, label: value  });
  removeList = () => this.props.removeList({ id: this.props.id });


  render(){
    const { connectDragSource, connectDropTarget, isDragging } = this.props;
    const { cards, label } = this.props;
    // arrow syntax to retain -this- context
    const cardsload = cards.length ? cards.map((card) => this.renderCard(card)) : null;
    const draggingStyle = isDragging ? 'list is-dragging' : 'list';

    return connectDragSource(
      connectDropTarget(
        <div className={ draggingStyle }>
          <div className='list-header'>
            <EditableLine
               altclassName='form-control transparent pointer'
               className='form-control editable'
               value= { label }
               submitFn = { this.editList } />
             <Button
                bsSize='sm'
                className='transparent'
                onClick={ this.removeList }>
                <Glyphicon glyph='remove' />
             </Button>
          </div>
          <div className='list-body'>

            { cardsload }
            <CardAssistant text='Add a new card...' luid={ this.props.id }/>
          </div>
        </div>
      )
    )
  };
// component end
};

export default List;
