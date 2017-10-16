import { PURCHASE_HEADER_NEXT, PURCHASE_HEADER_CLEAR } from './PurchaseHeader.actions';

const initialState = {
  referenceNumber: '4',
};

export default function purchaseHeader(state = initialState, action) {
  switch (action.type) {
    case PURCHASE_HEADER_NEXT:
      return { ...state, ...action.data };
    case PURCHASE_HEADER_CLEAR:
      return initialState;
    default:
      return state;
  }
}
