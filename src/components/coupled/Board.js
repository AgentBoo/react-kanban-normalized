// react
import React, { Component } from 'react';
// react-dnd
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// redux
import { connect } from 'react-redux';
import { passInitData, receiveInitData } from './../../store/actions/api';
// components
import List from './../containers/List';
import ListAssistant from './ListAssistant';


// ============================================================================ //
// Board component
// ============================================================================ //
class Board extends Component {
  componentDidMount(){
    if(this.props.init){
      return this.props.passInitData()
    }
      return this.props.receiveInitData()
  };

  renderList = ({ id, label, prim }) => (
    <List key={ id } id={ id } label={ label } />
  );


  render(){
    const { index, collection: lists } = this.props.lists;
    // arrow syntax to retain -this- context
    const listsload = index.length ? index.map((id) => this.renderList(lists[id])) : null;

    return (
      <section className='board'>

        { listsload }

        <ListAssistant text={ 'Add a new list...' } />
      </section>
    )
  };
// component end
};


// ============================================================================ //
// Board container
// ============================================================================ //
// NOTE: Redux
const mapStateToProps = (state) => ({ lists: state.lists })

// ============================================================================ //
Board = DragDropContext(HTML5Backend)(Board);
Board = connect(mapStateToProps, { receiveInitData })(Board);

export default Board;
