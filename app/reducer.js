import { combineReducers } from 'redux';
import purchaseHeader from './components/steps/PurchaseHeader.reducer';
import itemLine from './components/steps/ItemLine.reducer';
import vendorList from './components/reusable/VendorList.reducer';
import dateField from './components/reusable/DateField.reducer';

export default function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    purchaseHeader,
    itemLine,
    vendorList,
    dateField
  });
}
