// react
import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { newItem as newList } from './../../store/actions/requests';
// components
import { Button, Glyphicon } from 'react-bootstrap';

// This component is almost exactly the same as an editable line 

export class ListAssistant extends Component{
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
    remainder: 256-event.target.value.length 
  });

  startTyping = (event) => {
    event.stopPropagation()
    return this.toggleTyping()
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
       this.props.newList('new-list', { 
        label: this.state.value
      })
    }

    return this.cancelTyping()
  };

  render(){
    if(!this.state.active){
      return (
        <div>
        <div className='list assistant panel form-group'>
          <div className='panel-heading'>
            <span
               className='form-control'
               onClick={ this.startTyping }>
               { this.props.text }
            </span>
          </div>
        </div>
        </div>
      )
    } else {
      return (
        <div>
        <form
           className='list panel form-group'
           onSubmit={ this.handleSubmit }>
           <div className='panel-heading'>
              <input
                 type='text'
                 className='form-control'
                 ref={ this.activeInput }
                 placeholder={ this.props.text }
                 tabIndex='0'
                 value={ this.state.value }
                 onChange={ this.handleTyping }
                 onKeyDown={ this.handleKeyDown } />
            </div>
            <div className='panel-heading'>
               <Button
                  bsStyle='warning'
                  onClick={ this.handleSubmit }> Add </Button>
               <Button
                  bsStyle='primary'
                  onClick={ this.cancelTyping }>
                  <Glyphicon glyph='remove' />
               </Button>
            </div>            
        </form>
        </div>
      )
    }
  };
// end component
};


ListAssistant.defaultProps = {
  minlen    : 1,
  maxlen    : 256
};


ListAssistant = connect(null, { newList })(ListAssistant);

export default ListAssistant;
