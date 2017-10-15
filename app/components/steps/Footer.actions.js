export const FOOTER_INVOICE_IMAGE = 'FOOTER_INVOICE_IMAGE';
export const FOOTER_NAME = 'FOOTER_NAME';
export const FOOTER_SIGNATURE_IMAGE = 'FOOTER_SIGNATURE_IMAGE';
export const FOOTER_CLEAR = 'FOOTER_CLEAR';

export const addInvoiceReferenceImage = imageLocation => ({
  type: FOOTER_INVOICE_IMAGE,
  imageLocation
});


export const addName = name => ({
  type: FOOTER_NAME,
  name
});

export const addSignatureImage = imageLocation => ({
  type: FOOTER_SIGNATURE_IMAGE,
  imageLocation
});

export const clearFooter = () => ({ type: FOOTER_CLEAR });
