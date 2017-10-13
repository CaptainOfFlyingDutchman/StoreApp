import { PURCHASE_HEADER_NEXT, PURCHASE_HEADER_CLEAR } from './PurchaseHeader.actions';

export default function purchaseHeader(state = {}, action) {
  switch (action.type) {
    case PURCHASE_HEADER_NEXT:
      return { ...state, ...action.data };
    case PURCHASE_HEADER_CLEAR:
      return {};
    default:
      return state;
  }
}
