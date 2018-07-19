// react
import React, { Component } from 'react';
// react-dnd
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// redux
import { connect } from 'react-redux';
import { getLists } from './../../store/selectors';
// components
import List from './../containers/List';
import ListAssistant from './ListAssistant';


/* KANBAN COMPONENT */

class Board extends Component {
  renderList = ({ id, label }) => (
    <List key={ id } id={ id } label={ label } />
  );

  render(){
    const listsload = this.props.lists.map(list => this.renderList(list))
 
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
  lists: getLists(state)
})


Board = DragDropContext(HTML5Backend)(Board);
Board = connect(mapStateToProps)(Board);

export default Board;
