import { ITEM_LINE_NEXT, ITEM_LINE_CLEAR,
  ITEM_LINE_ADD, ITEM_LINE_UPDATE_INVOICE } from './ItemLine.actions';

const initialState = {
  itemLines: [],
  totalInvoiceValue: ''
};

const getTotalInvoiceValue = (state) => {
  const totalInvoiceValue = state.itemLines.reduce((acc, item) => {
    return acc + parseFloat(item.totalCost);
  }, 0);
  return totalInvoiceValue;
};

export default function itemLine(state = initialState, action) {
  switch (action.type) {
    case ITEM_LINE_ADD: {
      const newState = { ...state, itemLines: [...state.itemLines, { ...action.itemLine }] };
      return { ...newState, totalInvoiceValue: getTotalInvoiceValue(newState) };
    }
    case ITEM_LINE_NEXT:
      return { ...state, ...action.data };
    case ITEM_LINE_UPDATE_INVOICE:
      return { ...state, totalInvoiceValue: action.invoiceValue };
    case ITEM_LINE_CLEAR:
      return initialState;
    default:
      return state;
  }
}
