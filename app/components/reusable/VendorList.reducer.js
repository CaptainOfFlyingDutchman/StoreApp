import { VENDOR_LIST_SELECT_VENDOR } from './VendorList.actions';

export default function vendorList(state = {
  vendor: {}
}, action) {
  switch (action.type) {
    case VENDOR_LIST_SELECT_VENDOR:
      return { ...state, vendor: action.vendor };
    default:
      return state;
  }
}
