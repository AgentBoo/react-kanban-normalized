// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { newItem as newCard } from './../../store/actions/requests';
// components
import { Button, Glyphicon } from 'react-bootstrap';

// This component is almost exactly the same as an editable area

export class CardAssistant extends Component{
  constructor(props){
    super(props);
    this.activeInput = React.createRef();
    this.state = {
      active  : false,
      value   : '',
      remainder: 256
    }
  };

  componentDidUpdate(prevProps, prevState){
    if(this.state.active && !prevState.active){
       return this.activeInput.current.focus()
    }
  };

  // utilities
  toggleTyping = () => this.setState({ active: !this.state.active });
  cancelTyping = () => this.setState({ active: !this.state.active, value: '' });
  passesValidation = (value) => this.props.minlen <= value.length && value.length <= this.props.maxlen;

  // event handlers
  handleTyping = (event) => this.setState({ 
    value: event.target.value,
    remainder: 256 - event.target.value.length 
  });

  startTyping = (event) => {
    event.stopPropagation()
    this.toggleTyping()
  };

  handleKeyDown = (event) => {
    if(event.keyCode === 27){
       return this.toggleTyping()
    }

    if(event.keyCode === 13){
       return this.handleSubmit()
    }
  };

  handleSubmit = (event) => {
    if(event){
       event.preventDefault()
    }

    if(this.state.value.length && this.passesValidation(this.state.value.trim())){
       this.props.newCard('new-card', { 
        text: this.state.value, 
        luid: this.props.luid 
      })
    }

    this.cancelTyping()
  };


  // 2*, 3*
  render(){
    if(!this.state.active){
      return (
        <div className='panel form-group'>
          <div className='panel-body'>
            <span
               className='form-control form-control-plaintext'
               onClick={ this.startTyping }>
               { this.props.text }
            </span>
          </div>
        </div>
      )
    } else {
      return (
        <form
           className='panel form-group'
           onSubmit={ this.handleSubmit }>
           <div className='panel-body'>
              <textarea
                 type='text'
                 className='form-control'
                 ref={ this.activeInput }
                 rows='3'
                 placeholder={ this.props.text }
                 tabIndex='0'
                 value={ this.state.value }
                 onChange={ this.handleTyping }
                 onKeyDown={ this.handleKeyDown } />
            </div>
            <div className='panel-footer'>
               <Button
                  bsStyle='success'
                  onClick={ this.handleSubmit }> Add </Button>
               <Button
                  bsStyle='primary'
                  onClick={ this.cancelTyping }>
                  <Glyphicon glyph='remove' />
               </Button>
            </div>
        </form>
      )
    }
  };
// end component
};


CardAssistant.defaultProps = {
  minlen    : 1,
  maxlen    : 256
};


CardAssistant = connect(null, { newCard })(CardAssistant);

export default CardAssistant;
