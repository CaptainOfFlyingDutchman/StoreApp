import { PURCHASE_HEADER_NEXT } from './PurchaseHeader.actions';

export default function purchaseHeader(state = {}, action) {
  switch (action.type) {
    case PURCHASE_HEADER_NEXT:
      return { ...state, data: action.data };
    default:
      return state;
  }
}
