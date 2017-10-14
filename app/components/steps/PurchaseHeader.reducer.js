import { formatDate } from '../../utils';
import { PURCHASE_HEADER_NEXT, PURCHASE_HEADER_CLEAR,
  PURCHASE_HEADER_SET_DATE } from './PurchaseHeader.actions';

const initialState = {
  selectedDate: formatDate(new Date()),
  referenceNumber: '4',
};

export default function purchaseHeader(state = initialState, action) {
  switch (action.type) {
    case PURCHASE_HEADER_SET_DATE:
      return { ...state, selectedDate: action.date };
    case PURCHASE_HEADER_NEXT:
      return { ...state, ...action.data };
    case PURCHASE_HEADER_CLEAR:
      return initialState;
    default:
      return state;
  }
}