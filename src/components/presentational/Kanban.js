// react
import React from 'react';
// redux
import { connect } from 'react-redux';
import { destroyAll } from './../../store/actions/requests'
// components
import { Button } from 'react-bootstrap';
import Board from './../coupled/Board';

/* KANBAN COMPONENT */

let Kanban = ({ destroyAll }) => (
  <div>
  	  <header className='root-header'>
	    <Button bsStyle='primary'>
	       Kanban Demo
	    </Button>
	    <Button
	       bsStyle='primary'
	       onClick={() => destroyAll('destroy-kanban')}>
	       Destroy All Evidence
	    </Button>
	  </header>
	  <main className='root-main'>
	    <Board />
	  </main>
  </div>
);

Kanban = connect(null, { destroyAll })(Kanban)
export default Kanban;
