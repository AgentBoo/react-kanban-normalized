// react
import React from 'react';
// components
import Header from './presentational/sections/Header';
import Kanban from './presentational/sections/Kanban';
// import Footer from './presentational/sections/Footer';


// ============================================================================ //
// Root component
// ============================================================================ //
const Root = () => (
  <div>
    <Header />
    <Kanban />
  </div>
);

export default Root;
