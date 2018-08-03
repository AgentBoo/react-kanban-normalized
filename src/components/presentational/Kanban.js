// react
import React from 'react';
// redux
import { connect } from 'react-redux';
import { deleteAll } from './../../store/actions/requests';
// components
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import Board from './../coupled/Board';

/* KANBAN COMPONENT */

let Kanban = ({ deleteAll }) => (
  <div>
    <header className='root-header'>
      <h3> Kanban demo </h3>
      <Button
        bsClass='btn btn-xs btn-custom' 
        onClick={() => deleteAll('delete-kanban')}>
        Destroy All Evidence
	    </Button>
	  </header>
	  
    <main className='root-main'>
	    <Board />
	  </main>
	  
    <footer className='root-footer'>
	  	<DropdownButton
        id='dropdown-size-medium' 
        bsStyle='info'
        title='Archive'
        dropup
        noCaret>
        <MenuItem title='Date'> Card 1 </MenuItem>
        <MenuItem title='Date'> Card 2 </MenuItem>
        <MenuItem divider/>
        <MenuItem 
          disabled 
          onSelect={() => console.log('Baam')}>
          Delete Archived Cards
        </MenuItem>
      </DropdownButton>
      <p> This is a flash message </p>
	  </footer>
  </div>
);

Kanban = connect(null, { deleteAll })(Kanban);

export default Kanban;
