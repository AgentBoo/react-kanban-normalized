// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { newItem as newCard } from './../../store/actions/requests';
// components
import { Button, Glyphicon } from 'react-bootstrap';

// notes:
// 1* old react docs (React.createClass() days...) discouraged using props to set initial state;
//    use componentWillReceiveProps() to set initial state instead; https://medium.com/@justintulk/react-anti-patterns-props-in-initial-state-28687846cc2e
// 2* string literal in ref is deprecated; https://reactjs.org/docs/refs-and-the-dom.html


/* Controlled one-field form with switchable visibility */

export class CardAssistant extends Component{
  constructor(props){
    super(props);
    this.activeInput = React.createRef();
    this.state = {
      active  : false,
      value   : ''
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
  handleTyping = (event) => this.setState({ value: event.target.value });

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
       this.props.newCard('new-card', { text: this.state.value, luid: this.props.luid })
    }

    this.cancelTyping()
  };


  // 2*, 3*
  render(){
    if(!this.state.active){
      return (
        <div className='card assistant'>
          <div className='card-header form-group'>
            <span
               className='form-control transparent pointer'
               onClick={ this.startTyping }>
               { this.props.text }
            </span>
          </div>
        </div>
      )
    } else {
      return (
        <form
           className='card'
           onSubmit={ this.handleSubmit }>
           <div className='card-header form-group'>
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
            <div className='card-footer'>
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


// NOTE: Redux
CardAssistant = connect(null, { newCard })(CardAssistant);

export default CardAssistant;
