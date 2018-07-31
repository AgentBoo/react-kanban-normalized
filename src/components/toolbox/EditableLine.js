// react
import React, { Component } from 'react';

/* Editable Inline */

// Component matched against React Inline Edit https://github.com/kaivi/ReactInlineEdit

class EditableLine extends Component{
  constructor(props){
    super(props)
    this.activeInput = React.createRef();
    this.state = {
      editable  : false,
      value     : ''
    };
  };

  // 1*
  componentWillReceiveProps(nextProps){
    if(this.props.value !== nextProps.value){
       return this.setState({ value: nextProps.value })
    }
  };

  componentDidUpdate(prevProps, prevState){
    if(this.state.editable && !prevState.editable){
       this.activeInput.current.focus()
       this.activeInput.current.setSelectionRange(0, this.activeInput.current.value.length)
       return
    }
  };

  // utilities
  cancelEditing = () => this.setState({ 
    editable: !this.state.editable, 
    value: this.props.value 
  });
  passesValidation = (value) => this.props.minlen <= value.length && value.length <= this.props.maxlen;
  submitEditing = (event) => {
     if(event){
       event.preventDefault()
    }
     if(this.state.value.length && this.passesValidation(this.state.value.trim())){
       this.props.submitFn(this.state.value)
    }

    this.setState({ editable: !this.state.editable })
  };

  // event handlers
  handleTyping = (event) => this.setState({ value: event.target.value });

  handleKeyDown = (event) => {
    if(event.keyCode === 13){
      return this.submitEditing()
    }
    if(event.keyCode === 27){
      return this.cancelEditing()
    }
  };

  startEditing = (event) => {
    event.stopPropagation()
    this.setState({ 
        editable: !this.state.editable, 
        value: this.props.value 
    })
  };

  stopEditing = (event) => {
    if(this.props.value !== this.state.value && this.passesValidation(this.state.value.trim())){
       return this.submitEditing()
    }
    this.cancelEditing()
  };


  // 2*, 3*
  render(){
    if(!this.state.editable){
      return (
        <span 
            className={ this.props.altclassName }
            onClick={ this.startEditing }>
            { this.state.value || this.props.value }
        </span>
      )
    } else if(this.props.textarea){
        return (
            <textarea
               type='text'
               tabIndex= '0'
               className={ this.props.className }
               ref={ this.activeInput }
               rows='8'
               value={ this.state.value }
               onBlur={ this.stopEditing }
               onChange={ this.handleTyping }
               onKeyDown={ this.handleKeyDown } />
        )
    } else {
      return (
        <input
            type='text'
            tabIndex= '0'
            className={ this.props.className }
            ref={ this.activeInput }
            value={ this.state.value }
            onBlur={ this.stopEditing }
            onChange={ this.handleTyping }
            onKeyDown={ this.handleKeyDown } />
      )
    }
  };
// component end
};

EditableLine.defaultProps = {
  minlen    : 1,
  maxlen    : 256
};

export { EditableLine };


// notes:
// 1* old react docs (React.createClass() days...) discouraged using props to set initial state;
//    use componentWillReceiveProps() to set initial state instead; https://medium.com/@justintulk/react-anti-patterns-props-in-initial-state-28687846cc2e
// 2* make clear distinction between button type="submit" and button type="button"; https://github.com/erikras/redux-form/issues/2679
// 3* string literal in ref is deprecated; https://reactjs.org/docs/refs-and-the-dom.html

// NOTE: default mode: <span>
//       default props: minlen, maxlen
//       value = { fetched data } => this.props.value
//       on click: switches to edit + selects the entire current/original value for editing
//       on blur:  state value vs props value are different => save new/fire fetch
//                 state value vs props value are the same => cancel edit
//       on enter: state value vs props value are different => save new/fire fetch
//                 state value vs props value are the same => cancel edit
//       on esc:   state value vs props value are different => cancel edit + switch to original
//                 state value vs props value are the same => cancel edit
