export const PURCHASE_HEADER_NEXT = 'PURCHASE_HEADER_NEXT';
export const PURCHASE_HEADER_CLEAR = 'PURCHASE_HEADER_CLEAR';
export const PURCHASE_HEADER_SET_DATE = 'PURCHASE_HEADER_SET_DATE';

export const setDate = date => ({
  type: PURCHASE_HEADER_SET_DATE,
  date
});

export const next = data => ({
  type: PURCHASE_HEADER_NEXT,
  data
});

export const clearPurchaseHeader = () => ({ type: PURCHASE_HEADER_CLEAR });
