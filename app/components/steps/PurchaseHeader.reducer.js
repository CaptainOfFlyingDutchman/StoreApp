import { PURCHASE_HEADER_NEXT, PURCHASE_HEADER_CLEAR,
  PURCHASE_HEADER_REFERENCE_NUMBER } from './PurchaseHeader.actions';

const initialState = {
  referenceNumber: '',
};

export default function purchaseHeader(state = initialState, action) {
  switch (action.type) {
    case PURCHASE_HEADER_NEXT:
      return { ...state, ...action.data };
    case PURCHASE_HEADER_CLEAR:
      return initialState;
    case PURCHASE_HEADER_REFERENCE_NUMBER:
      return { ...state, referenceNumber: action.referenceNumber };
    default:
      return state;
  }
}
