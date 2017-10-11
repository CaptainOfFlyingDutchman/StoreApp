import React from 'react';
import { StackNavigator } from 'react-navigation';

import Tabs from './Tabs';
import PurchaseHeader from '../steps/PurchaseHeader';
import ItemLine from '../steps/ItemLine';
import Footer from '../steps/Footer';
import SignIn from '../SignIn';
import VendorsList from '../reusable/VendorList';

const Stacks = StackNavigator({
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
  }
});

export default Stacks;
