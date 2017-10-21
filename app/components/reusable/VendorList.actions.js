export const VENDOR_LIST_SELECT = 'VENDOR_LIST_SELECT';
export const VENDOR_LIST_CLEAR = 'VENDOR_LIST_CLEAR';
export const VENDOR_LIST_LOAD = 'VENDOR_LIST_LOAD';
export const VENDOR_LIST_VENDOR_TO_SEARCH = 'VENDOR_LIST_VENDOR_TO_SEARCH';

/**
 *
 * @param {Object} vendor
 */
export const selectVendor = vendor => ({
  type: VENDOR_LIST_SELECT,
  vendor
});

export const clearVendor = () => ({ type: VENDOR_LIST_CLEAR });

export const loadVendors = vendors => ({
  type: VENDOR_LIST_LOAD,
  vendors
});

export const setVendorToSearch = vendorToSearch => ({
  type: VENDOR_LIST_VENDOR_TO_SEARCH,
  vendorToSearch
});
