export const VENDOR_LIST_SELECT = 'VENDOR_LIST_SELECT';
export const VENDOR_LIST_CLEAR = 'VENDOR_LIST_CLEAR';

/**
 *
 * @param {Object} vendor
 */
export const selectVendor = vendor => ({
  type: VENDOR_LIST_SELECT,
  vendor
});

export const clearVendor = () => ({ type: VENDOR_LIST_CLEAR });
