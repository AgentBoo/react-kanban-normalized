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
  constructor(props){
    super(props)
    this.state = {
      showCardControls: false,
      showModal: false,
      updateStatus: '',
      updateTimes: 0,
    }
  };

  componentDidUpdate(prevProps, prevState){
    if(prevProps.text !== this.props.text){
      this.setState({
        updateStatus: 'Updated!',
        updateTimes: this.state.updateTimes + 1
      })
    }
  };

  handleModal = () => this.setState({
    showCardControls: false, 
    showModal: !this.state.showModal, 
  });

  showCardControls = () => this.setState({
    showCardControls: true
  });

  hideCardControls = () => this.setState({
    showCardControls: false
  });

  // pass down
  editCard = (text) => this.props.updateCard('update-card',{
    luid  : this.props.luid,
    id    : this.props.id,
    text  : text 
  });

  removeCard = () => this.props.deleteCard('delete-card', {
    luid  : this.props.luid,
    id    : this.props.id
  });

  render(){
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const { text } = this.props;

    return connectDragSource(
      connectDropTarget(
        <div 
          className={ isDragging ? 'card panel is-dragging' : 'card panel'}
          onMouseEnter={ this.showCardControls }
          onMouseLeave={ this.hideCardControls }>
          <div className='panel-inline-custom panel-body'>
            <span className='form-control form-control-plaintext'> { text } </span>
            <div 
              role='group'
              className={ this.state.showCardControls ? 'card-controls visible' : 'card-controls' }>
              <Button onClick={ this.handleModal }>
                <Glyphicon glyph='pencil' />
              </Button>
              <Button onClick={ this.removeCard }>
               <Glyphicon glyph='trash' />
              </Button>
            </div>
          </div>

          <Modal 
            show={ this.state.showModal } 
            onHide={ this.handleModal }>
            <Modal.Header 
              closeButton
              className='modal-header modal-header-custom'>
              <Modal.Title> Edit </Modal.Title>
              <span className='text-help'> (Click on the text below to make changes) </span>
            </Modal.Header>
            <Modal.Body bsClass='modal-body modal-body-custom'>
              <EditableLine 
                textarea
                overlay
                altclassName='form-control form-control-plaintext'
                className='form-control editable'
                value={ text }
                submitFn={ this.editCard } />
            </Modal.Body>
            <Modal.Footer bsClass='modal-footer modal-footer-custom'>
              <p className='text-flash'> { this.state.updateStatus } </p>
              <p className='text-flash'> 
                { this.state.updateTimes < 2 ? '' : `(${this.state.updateTimes}x)` } 
              </p>
              <Button onClick={ this.handleModal }>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    )
  };
// component end
};

export default Card;
