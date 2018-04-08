// react
import React from 'react';
// redux
import { connect } from 'react-redux';
import { destroyAll } from './../../../store/actions/api';
// components
import { Button } from 'react-bootstrap';


// ============================================================================ //
let Header = ({ destroyAll }) => (
  <header className='root-header'>
    <Button bsStyle='primary'>
       Kanban Demo
    </Button>
    <Button
       bsStyle='primary'
       onClick={ destroyAll }>
       Destroy All Evidence
    </Button>
  </header>
);

Header = connect(null, { destroyAll })(Header)
export default Header;
