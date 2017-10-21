import { VENDOR_LIST_SELECT, VENDOR_LIST_CLEAR, VENDOR_LIST_LOAD,
  VENDOR_LIST_VENDOR_TO_SEARCH } from './VendorList.actions';

const initialState = {
  vendorToSearch: '',
  vendors: [],
  vendor: {
    id: '',
    name: ''
  }
};

export default function vendorList(state = initialState, action) {
  switch (action.type) {
    case VENDOR_LIST_SELECT:
      return { ...state, vendor: action.vendor };
    case VENDOR_LIST_CLEAR:
      return initialState;
    case VENDOR_LIST_LOAD:
      return { ...state, vendors: action.vendors };
    case VENDOR_LIST_VENDOR_TO_SEARCH:
      return { ...state, vendorToSearch: action.vendorToSearch };
    default:
      return state;
  }
}
