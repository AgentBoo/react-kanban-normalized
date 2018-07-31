// react
import React from 'react';
// redux
import { connect } from 'react-redux';
import { deleteAll } from './../../store/actions/requests'
// components
import { Button } from 'react-bootstrap';
import Board from './../coupled/Board';

/* KANBAN COMPONENT */

let Kanban = ({ deleteAll }) => (
  <div>
  	  <header className='root-header'>
	    <Button bsStyle='primary'>
	       Kanban Demo
	    </Button>
	    <Button
	       bsStyle='primary'
	       onClick={() => deleteAll('delete-kanban')}>
	       Destroy All Evidence
	    </Button>
	  </header>
	  <main className='root-main'>
	    <Board />
	  </main>
  </div>
);

Kanban = connect(null, { deleteAll })(Kanban)
export default Kanban;
