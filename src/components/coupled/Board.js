// react
import React, { Component } from 'react';
// react-dnd
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import { default as TouchBackend } from 'react-dnd-touch-backend';
// redux
import { connect } from 'react-redux';
import { getLists } from './../../store/selectors';
// components
import List from './../containers/List';
import ListAssistant from './ListAssistant';


/* KANBAN COMPONENT */

class Board extends Component {
  renderList = (list, idx) => (
    <List key={ list.label } id={ list.id } label={ list.label } index={ idx } />
  );

  render(){
    const listsload = this.props.lists.map((list,idx) => this.renderList(list, idx))
    console.log(this.props.index)
    return (
      <section className='board'>

        { listsload }

        <ListAssistant text={ 'Add a new list...' } />
      </section>
    )
  };
// component end
};


/* KANBAN CONTAINER */

// redux
const mapStateToProps = (state) => ({ 
  lists: getLists(state),
  index: state.lists.index
})


Board = DragDropContext(HTML5Backend)(Board);
Board = connect(mapStateToProps)(Board);

export default Board;
