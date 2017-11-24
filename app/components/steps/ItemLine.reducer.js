import { ITEM_LINE_NEXT, ITEM_LINE_CLEAR,
  ITEM_LINE_ADD, ITEM_LINE_UPDATE_INVOICE, ITEM_LINE_REMOVE_ITEM } from './ItemLine.actions';

const initialState = {
  itemLines: [],
  totalInvoiceValue: ''
};

const getTotalInvoiceValue = (state) => {
  const totalInvoiceValue = state.itemLines.reduce((acc, item) => acc + item.totalCost, 0);
  return totalInvoiceValue;
};

export default function itemLine(state = initialState, action) {
  switch (action.type) {
    case ITEM_LINE_ADD: {
      const foundIndex = state.itemLines.findIndex(item =>
        item.barCodeData === action.itemLine.barCodeData);
      if (foundIndex === -1) {
        const newState = { ...state, itemLines: [...state.itemLines, { ...action.itemLine }] };
        return { ...newState, totalInvoiceValue: getTotalInvoiceValue(newState) };
      }

      const existingItem = state.itemLines[foundIndex];
      existingItem.quantity += action.itemLine.quantity;
      existingItem.totalCost += action.itemLine.totalCost;
      const newState = {
        ...state,
        itemLInes: [
          ...state.itemLines.slice(0, foundIndex),
          ...state.itemLines.slice(foundIndex + 1),
          existingItem
        ]
      };
      return { ...newState, totalInvoiceValue: getTotalInvoiceValue(newState) };
    }
    case ITEM_LINE_REMOVE_ITEM: {
      const foundIndex = state.itemLines.findIndex(item =>
        item.barCodeData === action.itemLine.barCodeData);

      if (foundIndex !== -1) {
        return {
          ...state,
          itemLines: [
            ...state.itemLines.slice(0, foundIndex),
            ...state.itemLines.slice(foundIndex + 1)
          ]
        };
      }

      return state;
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
