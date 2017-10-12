export const VENDOR_LIST_SELECT_VENDOR = 'VENDOR_LIST_SELECT_VENDOR';

/**
 *
 * @param {Object} vendor
 */
export const selectVendor = vendor => ({
  type: VENDOR_LIST_SELECT_VENDOR,
  vendor
});
