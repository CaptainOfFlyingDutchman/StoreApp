import { combineReducers } from 'redux';
import purchaseHeader from './components/steps/PurchaseHeader.reducer';
import vendorList from './components/reusable/VendorList.reducer';

export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    purchaseHeader,
    vendorList
  });
}
