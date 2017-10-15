export const ITEM_LINE_NEXT = 'ITEM_LINE_NEXT';
export const ITEM_LINE_CLEAR = 'ITEM_LINE_CLEAR';
export const ITEM_LINE_ADD = 'ITEM_LINE_ADD';
export const ITEM_LINE_UPDATE_INVOICE = 'ITEM_LINE_UPDATE_INVOICE';

export const addItemLine = itemLine => ({
  type: ITEM_LINE_ADD,
  itemLine
});

export const next = data => ({
  type: ITEM_LINE_NEXT,
  data
});

export const updateInvoiceValue = invoiceValue => ({
  type: ITEM_LINE_UPDATE_INVOICE,
  invoiceValue
});

export const clearItemLine = () => ({ type: ITEM_LINE_CLEAR });
