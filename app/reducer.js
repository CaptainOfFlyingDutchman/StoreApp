import { combineReducers } from 'redux';
import purchaseHeader from './components/steps/PurchaseHeader.reducer';
import itemLine from './components/steps/ItemLine.reducer';
import footer from './components/steps/Footer.reducer';
import vendorList from './components/reusable/VendorList.reducer';

export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    purchaseHeader,
    itemLine,
    footer,
    vendorList
  });
}
