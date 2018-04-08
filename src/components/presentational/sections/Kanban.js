// react
import React from 'react';
// redux
import { connect } from 'react-redux';
import { addCard } from './../../../store/actions/api';
// components
import Board from './../../coupled/Board';


// ============================================================================ //
// Kanban component
// ============================================================================ //
let Kanban = ({ addCard }) => (
  <main className='root-main'>
    <Board />
  </main>
);

Kanban = connect(null, { addCard })(Kanban);

export default Kanban;
