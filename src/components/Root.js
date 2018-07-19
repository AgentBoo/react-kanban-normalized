// react
import React from 'react';
// redux
import { Provider } from 'react-redux';
import configureStore from './../config/configureStore';
import { receiveInitData } from './../store/actions/requests';
// components
import Kanban from './presentational/Kanban';

const configured = configureStore();
	  configured.dispatch(receiveInitData('fetch-kanban'))

export { configured }

/* Root is injected into root div */

const Root = () => (
  <Provider store={ configured }>
    <Kanban />
  </Provider>
);

export default Root;
