// react
import React, { Component } from 'react';
// components
import { Button, Glyphicon, Modal } from 'react-bootstrap';
import { EditableLine } from './../toolbox/EditableLine';

/* CARD COMPONENT */
/*
  Cards are stacked in a column inside a List.
  Cards in motion have low opacity.
  Each card has 2 card controls that appear on hover. 
  Clicking on a magnifying button opens a modal with an editable area to update a Card text. 
  Clicking on a trash button destroys the Card.
*/

class Card extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      showCardControls: false,
      showModal: false 
    }
  }

  handleModal = () => this.setState({ 
    showModal: !this.state.showModal,
    showCardControls: false 
  })

  showCardControls = () => this.setState({
    showCardControls: true
  })

  hideCardControls = () => this.setState({
    showCardControls: false
  })

  // pass down
  updateCard = (text) => this.props.updateCard('update-card',{
    luid  : this.props.luid,
    id    : this.props.id,
    text  : text 
  })

  removeCard = () => this.props.deleteCard('delete-card', {
    luid  : this.props.luid,
    id    : this.props.id
  });

  render(){
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(
      connectDropTarget(
        <div className={ isDragging ? 'panel low-opacity' : 'panel'}
             onMouseEnter={ this.showCardControls }
             onMouseLeave={ this.hideCardControls }>
          <div className='panel-body panel-inline-custom'>
            <span> { text } </span>
            <div className={ this.state.showCardControls ? 'button-controls visible' : 'button-controls' }>
              <Button onClick={ this.handleModal }> A </Button>
              <Button onClick={ this.removeCard } type='button'> B </Button>
            </div>
          </div>

          <Modal 
            show={ this.state.showModal } 
            onHide={ this.handleModal }>
            <Modal.Header closeButton>
              <Modal.Title> Modal heading </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4> HI </h4>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={ this.handleModal }>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    )
  }
// component end
};

export default Card;
