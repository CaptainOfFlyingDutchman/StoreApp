import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import Tabs from './Tabs';
import PurchaseHeader from '../steps/PurchaseHeader';
import ItemLine from '../steps/ItemLine';
import Footer from '../steps/Footer';
import SignIn from '../SignIn';
import VendorsList from '../reusable/VendorList';
import ScannedItems from '../reusable/ScannedItems';
import getStore from '../../store';
import StacksContainer from './StacksContainer';

export const Stacks = StackNavigator({
  SignIn: {
    screen: SignIn
  },
  Tabs: {
    screen: Tabs
  },
  PurchaseHeader: {
    screen: PurchaseHeader
  },
  ItemLine: {
    screen: ItemLine
  },
  Footer: {
    screen: Footer
  },
  VendorsList: {
    screen: VendorsList
  },
  ScannedItems: {
    screen: ScannedItems
  }
});

const initialState = Stacks.router
  .getStateForAction(Stacks.router.getActionForPathAndParams('SignIn'));

const navReducer = (state = initialState, action) => {
  const newState = Stacks.router.getStateForAction(action, state);
  return newState || state;
};

const store = getStore(navReducer);

const Root = () => (
  <Provider store={store}>
    <StacksContainer />
  </Provider>
);

export default Root;
